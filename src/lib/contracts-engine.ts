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
    "List of services or deliverables",
    "Payment schedule or retainer",
    "Who owns finished work",
  ],
  finance: [
    "Principal amount",
    "Interest rate and repayment schedule",
    "Collateral or security, if any",
  ],
  policy: [
    "Company legal name",
    "Business address and contact email",
    "Governing state or jurisdiction",
  ],
  "real-estate": [
    "Property address and description",
    "Purchase price or rent",
    "Deposit and inspection details",
  ],
  employment: [
    "Role title and responsibilities",
    "Compensation and equity, if any",
    "Start date and contingencies",
  ],
  transaction: [
    "Item or asset description",
    "Purchase price",
    "Closing or transfer date",
  ],
  intellectual: [
    "IP being licensed or transferred",
    "Usage or exclusivity scope",
    "Compensation or royalties",
  ],
};

const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  service: "Services",
  finance: "Finance & Funding",
  policy: "Policies & Compliance",
  "real-estate": "Real Estate",
  employment: "Employment",
  transaction: "Sales & Transactions",
  intellectual: "Intellectual Property",
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
    "Detailed residential lease covering rent, repairs, and move-out terms.",
    "real-estate"
  ),
  "rental-residential": template(
    "Residential Rental Agreement",
    "Month-to-month or fixed-term rental tailored for homes and apartments.",
    "real-estate"
  ),
  "rental-commercial": template(
    "Commercial Lease Agreement",
    "Office, retail, or warehouse lease with business-class protections.",
    "real-estate"
  ),
  nda: template(
    "Mutual NDA",
    "Two-way confidentiality for hiring, fundraising, or partnerships.",
    "policy"
  ),
  "team-nda": template(
    "Team NDA",
    "Multi-party NDA for agencies, investors, and joint ventures.",
    "policy"
  ),
  "non-compete": template(
    "Non-Compete Agreement",
    "Protects against unfair competition or solicitation for a defined period.",
    "employment"
  ),
  "investor-safe": template(
    "Investor SAFE Agreement",
    "Y Combinator SAFE for early investment rounds.",
    "finance",
    ["Company valuation cap or discount", "Investor name", "Funding amount"]
  ),
  "purchase-order": template(
    "Purchase Order",
    "Binding confirmation of goods, pricing, and delivery expectations.",
    "transaction"
  ),
  "master-service": template(
    "Master Service Agreement",
    "Umbrella contract governing multiple statements of work.",
    "service"
  ),
  "consulting-simple": template(
    "Consulting Agreement (Simple)",
    "Lightweight consultant engagement for quick projects.",
    "service"
  ),
  "consulting-extended": template(
    "Consulting Agreement (Extended)",
    "Full SOW-based consulting contract with milestone tracking.",
    "service"
  ),
  "social-media-influencer": template(
    "Social Media Influencer Agreement",
    "Partnership deal for creators, influencers, and sponsors.",
    "service"
  ),
  "contractor-1099": template(
    "Contractor / 1099 Agreement",
    "Independent contractor agreement with tax-safe language.",
    "service"
  ),
  freelance: template(
    "Freelance Services Agreement",
    "Scope-driven services contract covering deliverables and ownership.",
    "service"
  ),
  "employment-offer": template(
    "Employment Offer Letter",
    "At-will offer letter for new hires.",
    "employment"
  ),
  "employment-offer-extended": template(
    "Executive Offer Letter",
    "Extended offer letter with bonuses, equity, and covenants.",
    "employment"
  ),
  "general-service": template(
    "Professional Services Agreement",
    "Standard services engagement covering scope, IP, and payments.",
    "service"
  ),
  "partnership-llc": template(
    "LLC Partnership Agreement",
    "Operating agreement for co-founders or investors.",
    "transaction"
  ),
  "website-tos": template(
    "Website Terms of Service",
    "Public-facing TOS for SaaS and e-commerce.",
    "policy"
  ),
  "privacy-policy": template(
    "Privacy Policy",
    "GDPR + U.S. compliant privacy notice.",
    "policy"
  ),
  "refund-policy": template(
    "Refund & Return Policy",
    "Clear refunds approach for DTC brands.",
    "policy"
  ),
  "creator-copyright-transfer": template(
    "Creator Copyright Transfer",
    "Transfers ownership of creative work.",
    "intellectual"
  ),
  "software-license": template(
    "Software License Agreement",
    "SaaS or downloadable software license with usage limits.",
    "intellectual"
  ),
  subcontractor: template(
    "Subcontractor Agreement",
    "Agreement between a primary vendor and subcontractor.",
    "service"
  ),
  "maintenance-support": template(
    "Maintenance & Support Agreement",
    "Post-launch support contract with SLAs and response times.",
    "service"
  ),
  "real-estate-purchase": template(
    "Real Estate Purchase Agreement",
    "Purchase contract covering property details, deposits, and closing.",
    "real-estate"
  ),
  "bill-of-sale": template(
    "Bill of Sale",
    "Sale of goods contract with title transfer.",
    "transaction"
  ),
  "vehicle-sale-extended": template(
    "Vehicle Sale Agreement",
    "Detailed vehicle sale with disclosures and lien statements.",
    "transaction"
  ),
  "promissory-note": template(
    "Promissory Note",
    "Debt acknowledgment outlining principal, interest, and remedies.",
    "finance"
  ),
  "loan-agreement": template(
    "Loan Agreement",
    "Personal or business loan agreement with collateral and repayment.",
    "finance"
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
