import { getServerFirestore } from "@/lib/firebase/server";
import type {
  AiDraft,
  ContractFormPayload,
  ContractRecord,
  ContractType,
  SubscriptionPlan,
  UserProfile,
  PlanStatus,
} from "@/types/contracts";
import { randomUUID } from "crypto";

const COLLECTION_USERS = "users";
const COLLECTION_CONTRACTS = "contracts";
const COLLECTION_PAYMENTS = "payments";
const COLLECTION_AI_DRAFTS = "aiDrafts";

const nowISO = () => new Date().toISOString();

const requireDb = () => {
  const db = getServerFirestore();
  if (!db) {
    throw new Error(
      "Firestore is not initialized. Provide Firebase Admin credentials."
    );
  }
  return db;
};

export const getOrCreateUserProfile = async (params: {
  userId: string;
  email?: string;
}) => {
  const db = requireDb();
  const ref = db.collection(COLLECTION_USERS).doc(params.userId);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    const profile: UserProfile = {
      email: params.email ?? "",
      plan: null,
      subscriptionId: null,
      createdAt: nowISO(),
    };
    await ref.set(profile);
    return profile;
  }
  return snapshot.data() as UserProfile;
};

export const getUserProfile = async (userId: string) => {
  const db = requireDb();
  const snapshot = await db.collection(COLLECTION_USERS).doc(userId).get();
  return snapshot.exists ? (snapshot.data() as UserProfile) : null;
};

export const updateUserPlan = async (params: {
  userId: string;
  plan: SubscriptionPlan;
  subscriptionId?: string | null;
  planStatus?: PlanStatus;
  currentPeriodEnd?: string | null;
  nextBillingDate?: string | null;
  lastPaymentAt?: string | null;
  lastInvoiceId?: string | null;
  cancelledAt?: string | null;
  cancellationReason?: string | null;
}) => {
  const db = requireDb();
  const payload: Partial<UserProfile> = {
    plan: params.plan,
    subscriptionId: params.subscriptionId ?? null,
    updatedAt: nowISO(),
  };

  if (params.planStatus !== undefined) payload.planStatus = params.planStatus;
  if (params.currentPeriodEnd !== undefined) payload.currentPeriodEnd = params.currentPeriodEnd;
  if (params.nextBillingDate !== undefined) payload.nextBillingDate = params.nextBillingDate;
  if (params.lastPaymentAt !== undefined) payload.lastPaymentAt = params.lastPaymentAt;
  if (params.lastInvoiceId !== undefined) payload.lastInvoiceId = params.lastInvoiceId;
  if (params.cancelledAt !== undefined) payload.cancelledAt = params.cancelledAt;
  if (params.cancellationReason !== undefined) payload.cancellationReason = params.cancellationReason;

  await db.collection(COLLECTION_USERS).doc(params.userId).set(payload, { merge: true });
};

export const recordPaymentHistory = async (params: {
  userId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  status: "paid" | "failed";
  paidAt: string;
  subscriptionId?: string | null;
  plan?: SubscriptionPlan;
  periodStart?: string | null;
  periodEnd?: string | null;
}) => {
  const db = requireDb();
  await db
    .collection(COLLECTION_PAYMENTS)
    .doc(params.invoiceId)
    .set({
      userId: params.userId,
      invoiceId: params.invoiceId,
      amount: params.amount,
      currency: params.currency,
      status: params.status,
      paidAt: params.paidAt,
      plan: params.plan ?? null,
      subscriptionId: params.subscriptionId ?? null,
      periodStart: params.periodStart ?? null,
      periodEnd: params.periodEnd ?? null,
      recordedAt: nowISO(),
    });
};

export const saveContractRecord = async (params: {
  userId: string;
  contractType: ContractType;
  title: string;
  content: string;
  formData: ContractFormPayload;
}) => {
  const db = requireDb();
  const id = randomUUID();
  const record: ContractRecord = {
    id,
    createdAt: nowISO(),
    ...params,
  };

  await db.collection(COLLECTION_CONTRACTS).doc(id).set({
    userId: record.userId,
    contractType: record.contractType,
    formData: record.formData,
    title: record.title,
    content: record.content,
    createdAt: record.createdAt,
  });

  return record;
};

export const getContractByIdForUser = async (params: {
  userId: string;
  contractId: string;
}) => {
  const db = requireDb();
  const snapshot = await db.collection(COLLECTION_CONTRACTS).doc(params.contractId).get();
  if (!snapshot.exists) return null;
  const data = snapshot.data() as Omit<ContractRecord, "id">;
  if (data.userId !== params.userId) {
    return null;
  }
  return { id: snapshot.id, ...data } as ContractRecord;
};

export const getContractsForUser = async (userId: string) => {
  const db = requireDb();
  const snapshot = await db
    .collection(COLLECTION_CONTRACTS)
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...(doc.data() as Omit<ContractRecord, "id">) }) as ContractRecord
  );
};

export const saveAiDraftRecord = async (params: {
  userId: string;
  prompt: string;
  output: string;
  source: "gemini";
}) => {
  const db = requireDb();
  const id = randomUUID();
  const timestamp = nowISO();
  const record: AiDraft = {
    id,
    userId: params.userId,
    prompt: params.prompt,
    output: params.output,
    source: params.source,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await db.collection(COLLECTION_AI_DRAFTS).doc(id).set(record);
  return record;
};

export const getAiDraftsForUser = async (userId: string) => {
  const db = requireDb();
  const snapshot = await db
    .collection(COLLECTION_AI_DRAFTS)
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .limit(20)
    .get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...(doc.data() as Omit<AiDraft, "id">) }) as AiDraft
  );
};
