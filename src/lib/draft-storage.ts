import type { ContractFormValues } from "@/lib/validators";
import type { ContractType } from "@/types/contracts";

const DRAFT_KEY = "mmc_pending_contract_draft";

type StoredDraft = {
  path: string;
  contractType: ContractType;
  values: ContractFormValues;
  savedAt: number;
};

const isBrowser = () => typeof window !== "undefined";

export const saveDraft = (draft: StoredDraft) => {
  if (!isBrowser()) return;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

export const getDraft = (): StoredDraft | null => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredDraft;
  } catch (error) {
    return null;
  }
};

export const clearDraft = () => {
  if (!isBrowser()) return;
  localStorage.removeItem(DRAFT_KEY);
};
