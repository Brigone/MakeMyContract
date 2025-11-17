import type { ContractFormPayload, ContractType } from "@/types/contracts";

type TemplateCategory =
  | "service"
  | "finance"
  | "policy"
  | "real-estate"
  | "employment"
  | "transaction"
  | "intellectual";

interface ContractTemplate {
  label: string;
  seoTitle: string;
  description: string;
  checklist: string[];
  category: TemplateCategory;
  categoryLabel: string;
}

const CATEGORY_CHECKLISTS: Record<TemplateCategory, string[]> = {
  service: [
    "Property address and unit",
    "Tenant or guest names",
    "Move-in or move-out date",
  ],
  finance: [
    "Monthly rent or deposit amount",
    "Due dates and payment method",
    "Landlord banking details",
  ],
  policy: [
    "Tenant name and property address",
    "Policy effective date",
    "Penalties or fees to disclose",
  ],
  "real-estate": [
    "Landlord and tenant legal names",
    "Lease term start and end dates",
    "Monthly rent, deposits, and utilities",
  ],
  employment: [
    "Applicant full name and contact info",
    "Identification or SSN if required",
    "Consent to screening requirements",
  ],
  transaction: [
    "Notice type and effective date",
    "Forwarding address or property info",
    "Signature and delivery method",
  ],
  intellectual: [
    "House rules being enforced",
    "Areas of the property they cover",
    "Enforcement or penalty details",
  ],
};

const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  service: "Turnover Checklists",
  finance: "Deposits & Guarantees",
  policy: "Notices & Addendums",
  "real-estate": "Core Rental Agreements",
  employment: "Tenant Screening",
  transaction: "Move Logistics",
  intellectual: "Property Policies",
};

const template = (
  label: string,
  description: string,
  category: TemplateCategory,
  checklist?: string[],
  seoTitle?: string
): ContractTemplate => ({
  label,
  description,
  category,
  checklist: checklist ?? CATEGORY_CHECKLISTS[category],
  seoTitle: seoTitle ?? `${label} Template`,
  categoryLabel: CATEGORY_LABELS[category],
});

export const CONTRACT_LIBRARY: Record<ContractType, ContractTemplate> = {
  "residential-lease": template(
    "Residential Lease Agreement",
    "Full-term lease covering rent, maintenance, renewals, and local disclosures for any single-family or multifamily unit.",
    "real-estate",
    [
      "Landlord entity name and contact",
      "Tenant names and occupants",
      "Lease term, rent, deposit, and utilities",
    ]
  ),
  "month-to-month-lease": template(
    "Month-to-Month Lease",
    "Rolling tenancy agreement with configurable notice periods and automatic renewals for flexible rentals.",
    "real-estate",
    [
      "Property address and description",
      "Initial rent amount and due date",
      "Notice period for both parties",
    ]
  ),
  "short-term-rental": template(
    "Short-Term Rental (Airbnb)",
    "Host-ready contract for vacation rentals, Airbnb, and furnished stays with guest rules and fee schedules.",
    "real-estate",
    [
      "Host and guest information",
      "Check-in/check-out dates",
      "Security deposit and house rules",
    ]
  ),
  "room-rental": template(
    "Room Rental Agreement",
    "Roommate-friendly lease for renting a bedroom inside a shared home or accessory dwelling.",
    "real-estate",
    [
      "Primary leaseholder and roommate info",
      "Area being rented and shared spaces",
      "Utilities and house rules",
    ]
  ),
  sublease: template(
    "Sublease Agreement",
    "Allows a tenant to sublet part or all of a unit while keeping the primary lease compliant.",
    "real-estate",
    [
      "Original lease details",
      "Subtenant contact and term dates",
      "Rent pass-through and approvals",
    ]
  ),
  "pet-addendum": template(
    "Pet Addendum",
    "Adds approved pets, fees, and damage expectations to an existing lease.",
    "policy",
    [
      "Tenant and pet details",
      "Pet rent or deposits",
      "Rules for breeds, noise, and cleaning",
    ]
  ),
  "smoking-addendum": template(
    "Smoking Addendum",
    "Clarifies smoke-free zones, penalties, and enforcement for your property.",
    "policy",
    [
      "Property address",
      "Areas where smoking is restricted",
      "Fees for violating the policy",
    ]
  ),
  "move-in-checklist": template(
    "Move-In Checklist",
    "Room-by-room checklist for documenting property condition on day one.",
    "service",
    [
      "Property and unit numbers",
      "Tenant or guest names",
      "Inspection date and photos",
    ]
  ),
  "move-out-checklist": template(
    "Move-Out Checklist",
    "Structured inspection list to log damages, cleaning tasks, and deposit deductions.",
    "service",
    [
      "Forwarding address",
      "Final inspection date",
      "Areas to evaluate",
    ]
  ),
  "eviction-notice": template(
    "Eviction Notice",
    "State-aware delivery of cure-or-quit instructions, rent owed, and key deadlines.",
    "policy",
    [
      "Tenant legal name and unit",
      "Reason for eviction",
      "Compliance or vacate deadline",
    ]
  ),
  "rent-increase-notice": template(
    "Rent Increase Notice",
    "Notifies tenants of upcoming rent adjustments while honoring statutory timelines.",
    "policy",
    [
      "Current and new rent amounts",
      "Effective increase date",
      "Notice period per state law",
    ]
  ),
  "lease-renewal": template(
    "Lease Renewal",
    "Extends an existing lease with updated pricing, term, or incentives.",
    "real-estate",
    [
      "Original lease reference",
      "New term and rent",
      "Any concessions or addendums",
    ]
  ),
  "intent-to-vacate": template(
    "Intent to Vacate",
    "Tenant notice confirming when they plan to surrender possession and where to mail deposits.",
    "transaction",
    [
      "Move-out date",
      "Forwarding address",
      "Reason for vacating",
    ]
  ),
  "rental-application": template(
    "Rental Application Form",
    "Comprehensive intake for prospective tenants covering employment, income, and rental history.",
    "employment",
    [
      "Applicant identity and contact info",
      "Income/employer details",
      "Prior landlord references",
    ]
  ),
  "background-check-authorization": template(
    "Background Check Authorization",
    "Collects written consent to run credit, eviction, or criminal history reports.",
    "employment",
    [
      "Applicant full name and SSN/ID",
      "Screening services being used",
      "Signature granting permission",
    ]
  ),
  "co-signer-agreement": template(
    "Co-Signer Agreement",
    "Adds guarantors who agree to pay rent, fees, and damages if tenants default.",
    "finance",
    [
      "Primary tenant and co-signer info",
      "Financial responsibility scope",
      "Release or review periods",
    ]
  ),
  "security-deposit-agreement": template(
    "Security Deposit Agreement",
    "Documents deposit amounts, holding rules, allowable deductions, and refund timelines.",
    "finance",
    [
      "Deposit amount and due date",
      "Bank or escrow location",
      "Conditions for withholding funds",
    ]
  ),
};

const clauseWithSummary = (title: string, summary: string, body: string) =>
  `\n${title.toUpperCase()}\nSummary: ${summary.trim()}\n\n${body.trim()}\n`;

const signatureBlock = () => `\nSIGNATURES\n\nParty A: ________________________________    Date: __________________\nParty B: ________________________________    Date: __________________\n`;

const partyLabel = (payload: ContractFormPayload) =>
  `${payload.partyOneName} (“Party A”) and ${payload.partyTwoName} (“Party B”)`;

const overviewClause = (
  template: ContractTemplate,
  payload: ContractFormPayload
) => {
  const summary =
    (payload.plainSummaryIntro?.trim() || payload.relationshipSummary?.trim()) ??
    `This document outlines how ${payload.partyOneName} and ${payload.partyTwoName} will work together.`;
  const body = `${template.description} This agreement is effective ${payload.effectiveDate} and binds ${partyLabel(
    payload
  )}.`;
  return clauseWithSummary("Plain-English Overview", summary, body);
};

const businessTermsClause = (payload: ContractFormPayload) => {
  const summary =
    payload.paymentDetails?.trim() ??
    payload.paymentTerms?.trim() ??
    "Defines compensation, timing, and other commercial expectations.";
  const body = `Compensation: ${
    payload.paymentDetails || payload.paymentTerms || "As described in the attached schedule"
  }\nTerm: ${payload.termStart || payload.effectiveDate} through ${payload.termEnd || "until completion"}.`;
  return clauseWithSummary("Business Terms", summary, body);
};

const serviceClauses = (payload: ContractFormPayload) => {
  const sections: string[] = [];
  if (payload.scopeOfWork) {
    sections.push(
      clauseWithSummary(
        "Scope of Services",
        "Summarizes the duties and expectations.",
        payload.scopeOfWork
      )
    );
  }
  if (payload.deliverables) {
    sections.push(
      clauseWithSummary(
        "Deliverables",
        "Lists what will be produced or handed over.",
        payload.deliverables
      )
    );
  }
  if (payload.milestones) {
    sections.push(
      clauseWithSummary(
        "Milestones & Timeline",
        "Outlines key checkpoints or review dates.",
        payload.milestones
      )
    );
  }
  if (payload.warrantyTerms) {
    sections.push(
      clauseWithSummary(
        "Quality & Revisions",
        "Explains revision rounds or warranty coverage.",
        payload.warrantyTerms
      )
    );
  }
  if (payload.revisions) {
    sections.push(
      clauseWithSummary(
        "Revision Windows",
        "Defines how many revision rounds or change requests are included.",
        payload.revisions
      )
    );
  }
  if (payload.serviceGuarantees) {
    sections.push(
      clauseWithSummary(
        "Service Guarantees",
        "Outlines uptime promises, response times, or satisfaction guarantees.",
        payload.serviceGuarantees
      )
    );
  }
  return sections;
};

const financeClauses = (payload: ContractFormPayload) => {
  if (!payload.interestRate && !payload.repaymentSchedule && !payload.collateral) {
    return [];
  }
  const summary = "Details the payment schedule, interest, penalties, and collateral.";
  const body = `Interest Rate: ${payload.interestRate || "As agreed"}\nRepayment Schedule: ${
    payload.repaymentSchedule || "See attached amortization"
  }\nCollateral: ${payload.collateral || "None"}\nLate Fees: ${payload.lateFees || "As permitted by law"}`;
  const penalties = payload.financePenalties
    ? `\nPenalties: ${payload.financePenalties}`
    : "";
  return [clauseWithSummary("Financial Terms", summary, `${body}${penalties}`)];
};

const propertyClauses = (payload: ContractFormPayload) => {
  if (!payload.propertyAddress && !payload.purchasePrice) return [];
  const summary = "Identifies the property, purchase price, and deposit expectations.";
  const body = `Property: ${payload.propertyAddress || "Described in Exhibit A"}\nPrice/Rent: ${
    payload.purchasePrice || payload.paymentDetails || "See schedule"
  }\nDeposit: ${payload.depositAmount || "Per invoice"}`;
  return [clauseWithSummary("Property Details", summary, body)];
};

const policyClause = (template: ContractTemplate, payload: ContractFormPayload) =>
  clauseWithSummary(
    "Policy Statement",
    "Explains how users or customers should interact with your product or brand.",
    `${template.description} ${payload.partyOneName} may update this policy by providing notice to impacted users.`
  );

const confidentialityClause = () =>
  clauseWithSummary(
    "Confidentiality",
    "Sensitive information must remain private unless disclosure is legally required.",
    "Each party agrees to use reasonable care to protect Confidential Information, restrict disclosure to personnel with a need to know, and destroy or return copies upon request."
  );

const indemnificationClause = () =>
  clauseWithSummary(
    "Indemnification",
    "Protects each party if the other causes losses or lawsuits.",
    "Each party agrees to indemnify, defend, and hold harmless the other party from third-party claims arising from the indemnifying party's breach, negligence, or intentional misconduct."
  );

const liabilityClause = () =>
  clauseWithSummary(
    "Limitation of Liability",
    "Caps monetary exposure so neither party is bankrupted by indirect losses.",
    "Except for fraud or intentional misconduct, neither party will be liable for consequential damages, and aggregate liability is capped at the fees paid in the twelve (12) months preceding the claim."
  );

const ipClause = (payload: ContractFormPayload) =>
  clauseWithSummary(
    "Intellectual Property",
    "Clarifies who owns the work product and what usage rights apply.",
    payload.ownershipDetails ||
      `Unless otherwise agreed, all deliverables created by ${payload.partyOneName} for ${payload.partyTwoName} are deemed work made for hire and owned by ${payload.partyTwoName}.`
  );

const nonSolicitClause = () =>
  clauseWithSummary(
    "Non-Solicitation",
    "Prevents either party from poaching talent or clients for a stated period.",
    "During the term and for twelve (12) months thereafter, neither party will solicit or hire the other party's employees or key contractors, except through general job postings."
  );

const arbitrationClause = (state: string) =>
  clauseWithSummary(
    "Arbitration",
    "Disputes will be resolved privately instead of in open court.",
    `Any dispute shall be resolved by binding arbitration administered in ${state}, with judgment on the award enforceable in any competent court.`
  );

const governingLawClause = (state: string) =>
  clauseWithSummary(
    "Governing Law",
    "Specifies the state laws and courts that control this contract.",
    `This agreement is governed by the laws of the State of ${state}, without regard to conflicts of law. Venue lies exclusively in ${state}.`
  );

const standardClauses = (payload: ContractFormPayload) => [
  clauseWithSummary(
    "Representations & Warranties",
    "Both parties confirm they have the authority to sign and will share truthful information.",
    `${partyLabel(payload)} each represent and warrant that they are duly organized, authorized to enter this agreement, and will provide accurate information required to perform their obligations.`
  ),
  clauseWithSummary(
    "Termination",
    "Explains how either party can end the relationship if things go off track.",
    "Either party may terminate for non-payment or material breach not cured within ten (10) days' notice. Sections regarding payment, confidentiality, indemnity, and dispute resolution survive termination."
  ),
  clauseWithSummary(
    "Notices",
    "Formal communications must be sent to the addresses provided.",
    "All notices must be in writing and delivered by certified mail, courier, or confirmed email to the addresses supplied by each party."
  ),
  clauseWithSummary(
    "Entire Agreement",
    "States this document overrides prior conversations unless amended in writing.",
    "This agreement constitutes the entire understanding between the parties and supersedes all prior proposals or discussions. Any amendment must be in writing and signed by both parties."
  ),
  clauseWithSummary(
    "Severability",
    "If one clause is invalid, the rest still stand.",
    "If any provision is held unenforceable, the remainder will remain in full force, and the parties will replace the invalid provision with one that captures their intent."
  ),
];

export const generateContractFromTemplate = (
  contractType: ContractType,
  payload: ContractFormPayload
) => {
  const templateConfig = CONTRACT_LIBRARY[contractType];
  if (!templateConfig) {
    throw new Error(`Template not found for contract type: ${contractType}`);
  }

  const sections: string[] = [];
  sections.push(overviewClause(templateConfig, payload));
  sections.push(businessTermsClause(payload));

  switch (templateConfig.category) {
    case "service":
    case "employment":
      sections.push(...serviceClauses(payload));
      break;
    case "finance":
      sections.push(...financeClauses(payload));
      break;
    case "real-estate":
    case "transaction":
      sections.push(...propertyClauses(payload));
      break;
    case "policy":
    case "intellectual":
      sections.push(policyClause(templateConfig, payload));
      break;
    default:
      break;
  }

  if (payload.includeConfidentiality) sections.push(confidentialityClause());
  if (payload.includeIpOwnership) sections.push(ipClause(payload));
  if (payload.includeNonSolicitation) sections.push(nonSolicitClause());
  if (payload.includeArbitration) sections.push(arbitrationClause(payload.governingLaw));
  if (payload.includeIndemnification) sections.push(indemnificationClause());
  if (payload.includeLiabilityCap) sections.push(liabilityClause());

  sections.push(...standardClauses(payload));
  sections.push(governingLawClause(payload.governingLaw));

  if (payload.customNotes) {
    sections.push(
      clauseWithSummary("Additional Notes", "Custom expectations recorded by the creator.", payload.customNotes)
    );
  }

  (payload.optionalClauses ?? []).forEach((text, idx) => {
    sections.push(
      clauseWithSummary(`Custom Clause ${idx + 1}`, "Added by the contract creator.", text)
    );
  });

  sections.push(signatureBlock());

  return {
    title: templateConfig.label,
    content: sections.filter(Boolean).join("\n"),
    template: templateConfig,
  };
};
