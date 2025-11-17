import { US_STATES } from "@/constants/us-states";

export const CONTRACT_TYPES = [
  "residential-lease",
  "month-to-month-lease",
  "short-term-rental",
  "room-rental",
  "sublease",
  "pet-addendum",
  "smoking-addendum",
  "move-in-checklist",
  "move-out-checklist",
  "eviction-notice",
  "rent-increase-notice",
  "lease-renewal",
  "intent-to-vacate",
  "rental-application",
  "background-check-authorization",
  "co-signer-agreement",
  "security-deposit-agreement",
] as const;

export type ContractType = (typeof CONTRACT_TYPES)[number];

export type GoverningLawState = (typeof US_STATES)[number];

export interface ContractFormPayload {
  contractType: ContractType;
  partyOneName: string;
  partyOneAddress?: string;
  partyTwoName: string;
  partyTwoAddress?: string;
  effectiveDate: string;
  governingLaw: GoverningLawState;
  termStart?: string;
  termEnd?: string;
  relationshipSummary?: string;
  paymentTerms?: string;
  paymentDetails?: string;
  scopeOfWork?: string;
  deliverables?: string;
  milestones?: string;
  revisions?: string;
  warrantyTerms?: string;
  ownershipDetails?: string;
  propertyAddress?: string;
  purchasePrice?: string;
  depositAmount?: string;
  collateral?: string;
  interestRate?: string;
  repaymentSchedule?: string;
  lateFees?: string;
  financePenalties?: string;
  serviceGuarantees?: string;
  plainSummaryIntro?: string;
  optionalClauses: string[];
  customNotes?: string;
  includeConfidentiality?: boolean;
  includeIndemnification?: boolean;
  includeLiabilityCap?: boolean;
  includeNonSolicitation?: boolean;
  includeArbitration?: boolean;
  includeIpOwnership?: boolean;
}

export interface ContractRecord {
  id: string;
  userId: string;
  title: string;
  contractType: ContractType;
  content: string;
  formData: ContractFormPayload;
  createdAt: string;
}

export type SubscriptionPlan = "weekly" | "monthly" | "annual" | "expired" | null;
export type PlanStatus = "active" | "past_due" | "canceled" | "trialing" | null;

export interface UserProfile {
  email: string;
  plan: SubscriptionPlan;
  subscriptionId: string | null;
  createdAt: string;
  updatedAt?: string;
  planStatus?: PlanStatus;
  currentPeriodEnd?: string | null;
  nextBillingDate?: string | null;
  lastInvoiceId?: string | null;
  lastPaymentAt?: string | null;
  cancelledAt?: string | null;
  cancellationReason?: string | null;
}
