import { z } from "zod";
import { CONTRACT_TYPES } from "@/types/contracts";
import { US_STATES } from "@/constants/us-states";

export const contractFormSchema = z.object({
  contractType: z.enum(CONTRACT_TYPES),
  partyOneName: z.string().min(2, "Enter a valid legal name."),
  partyOneAddress: z.string().min(5, "Provide a mailing address."),
  partyTwoName: z.string().min(2, "Enter a valid legal name."),
  partyTwoAddress: z.string().min(5, "Provide a mailing address."),
  effectiveDate: z.string().min(4, "Effective date is required."),
  termStart: z.string().optional(),
  termEnd: z.string().optional(),
  governingLaw: z.enum(US_STATES),
  relationshipSummary: z.string().min(10, "Briefly describe the relationship."),
  paymentTerms: z.string().optional(),
  paymentDetails: z.string().optional(),
  scopeOfWork: z.string().optional(),
  deliverables: z.string().optional(),
  milestones: z.string().optional(),
  revisions: z.string().optional(),
  warrantyTerms: z.string().optional(),
  ownershipDetails: z.string().optional(),
  propertyAddress: z.string().optional(),
  purchasePrice: z.string().optional(),
  depositAmount: z.string().optional(),
  collateral: z.string().optional(),
  interestRate: z.string().optional(),
  repaymentSchedule: z.string().optional(),
  lateFees: z.string().optional(),
  financePenalties: z.string().optional(),
  serviceGuarantees: z.string().optional(),
  plainSummaryIntro: z.string().optional(),
  includeConfidentiality: z.boolean().optional().default(true),
  includeIndemnification: z.boolean().optional().default(true),
  includeLiabilityCap: z.boolean().optional().default(true),
  includeNonSolicitation: z.boolean().optional().default(true),
  includeArbitration: z.boolean().optional().default(true),
  includeIpOwnership: z.boolean().optional().default(true),
  optionalClauses: z.array(z.string()).default([]),
  customNotes: z.string().optional(),
});

export type ContractFormValues = z.infer<typeof contractFormSchema> & {
  optionalClauses: string[];
};
