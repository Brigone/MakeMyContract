"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContractFormPayload, SubscriptionPlan, ContractType } from "@/types/contracts";
import { CONTRACT_LIBRARY } from "@/lib/contracts-engine";
import { fireAdsConversion } from "@/lib/ads-tracking";

interface DraftWizardProps {
  user: {
    uid: string;
    email: string;
    plan: SubscriptionPlan;
  } | null;
  showBackLink?: boolean;
}

interface ContractOption {
  id: ContractType;
  label: string;
  description: string;
  icon: string;
  basicsFields: FieldDefinition[];
  toggles: ToggleDefinition[];
}

interface FieldDefinition {
  name: keyof ContractFormPayload | string;
  label: string;
  placeholder: string;
  type?: "text" | "date" | "number";
  helper?: string;
}

interface ToggleDefinition {
  name: keyof ContractFormPayload;
  label: string;
  helper: string;
}

interface WizardData {
  contractType: ContractFormPayload["contractType"] | null;
  basics: Record<string, string>;
  toggles: Record<string, boolean>;
  notes: string;
}

const LOCAL_STORAGE_KEY = "mmc-draft-wizard";
const steps = ["Type", "Basics", "Details", "Review"];

const hasActivePlan = (plan?: SubscriptionPlan | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

const BASE_FIELDS: FieldDefinition[] = [
  { name: "partyOneName", label: "First party", placeholder: "Acme Inc.", helper: "Who is issuing the contract?" },
  { name: "partyTwoName", label: "Second party", placeholder: "Jordan Smith", helper: "Who receives the contract?" },
  { name: "effectiveDate", label: "Effective date", placeholder: "2024-10-01", type: "date", helper: "When does this agreement start?" },
  { name: "governingLaw", label: "Governing state", placeholder: "CA", helper: "Which U.S. state laws apply?" },
  { name: "paymentTerms", label: "Payment terms", placeholder: "$5,000 due monthly", helper: "How and when money changes hands?" },
  { name: "scopeOfWork", label: "Scope / summary", placeholder: "Marketing services for Q4", helper: "What is being provided?" },
];

const PROPERTY_FIELDS: FieldDefinition[] = [
  { name: "partyOneName", label: "Owner/Landlord", placeholder: "Acme Homes LLC" },
  { name: "partyTwoName", label: "Tenant/Buyer", placeholder: "Jordan Smith" },
  { name: "propertyAddress", label: "Property address", placeholder: "123 Market St, Austin, TX" },
  { name: "termStart", label: "Start date", placeholder: "2024-11-01", type: "date" },
  { name: "termEnd", label: "End date", placeholder: "2025-10-31", type: "date" },
  { name: "paymentTerms", label: "Rent / price", placeholder: "$2,300 per month" },
];

const FINANCE_FIELDS: FieldDefinition[] = [
  { name: "partyOneName", label: "Lender", placeholder: "Northwind Funding" },
  { name: "partyTwoName", label: "Borrower", placeholder: "Jordan Smith" },
  { name: "purchasePrice", label: "Principal amount", placeholder: "$120,000" },
  { name: "interestRate", label: "Interest rate", placeholder: "6.5% APR" },
  { name: "repaymentSchedule", label: "Repayment schedule", placeholder: "Monthly payments for 24 months" },
  { name: "collateral", label: "Collateral", placeholder: "2019 Tesla Model 3" },
];

const DEFAULT_TOGGLES: ToggleDefinition[] = [
  { name: "includeConfidentiality", label: "Confidentiality", helper: "Keep sensitive details private." },
  { name: "includeIndemnification", label: "Indemnification", helper: "Cover losses caused by negligence." },
  { name: "includeLiabilityCap", label: "Limit liability", helper: "Limit damages to a predictable amount." },
  { name: "includeNonSolicitation", label: "Non-solicitation", helper: "Prevent poaching of talent or clients." },
  { name: "includeArbitration", label: "Arbitration", helper: "Resolve disputes outside court." },
  { name: "includeIpOwnership", label: "IP ownership", helper: "Clarify who owns deliverables." },
];

const InfoTooltip = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[0.6rem] font-semibold text-slate-500 transition hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        ?
      </button>
      {open && (
        <span className="absolute left-1/2 top-6 z-20 w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-600 shadow-xl">
          {text}
          <button type="button" className="mt-2 text-[0.65rem] font-semibold text-blue-600" onClick={() => setOpen(false)}>
            Got it
          </button>
        </span>
      )}
    </span>
  );
};

const ICON_MAP: Record<string, string> = {
  lease: "Lease",
  rental: "Rental",
  nda: "NDA",
  service: "Service",
  loan: "Loan",
  equity: "Equity",
  policy: "Policy",
  employment: "Contract",
  default: "Contract",
};

const defaultData: WizardData = {
  contractType: null,
  basics: {},
  toggles: {
    includeConfidentiality: true,
    includeIndemnification: true,
    includeLiabilityCap: true,
    includeNonSolicitation: false,
    includeArbitration: false,
    includeIpOwnership: true,
  },
  notes: "",
};

const fieldPresets: Partial<Record<ContractType, FieldDefinition[]>> = {
  "residential-lease": PROPERTY_FIELDS,
  "rental-residential": PROPERTY_FIELDS,
  "rental-commercial": PROPERTY_FIELDS,
  "real-estate-purchase": PROPERTY_FIELDS,
  "bill-of-sale": PROPERTY_FIELDS,
  "vehicle-sale-extended": PROPERTY_FIELDS,
  "promissory-note": FINANCE_FIELDS,
  "loan-agreement": FINANCE_FIELDS,
};

const togglePresets: Partial<Record<ContractType, ToggleDefinition[]>> = {};

const iconForType = (type: ContractType): string => {
  if (type.includes("lease") || type.includes("rental") || type.includes("real-estate")) return ICON_MAP.lease;
  if (type.includes("nda")) return ICON_MAP.nda;
  if (type.includes("service") || type.includes("consulting")) return ICON_MAP.service;
  if (type.includes("loan") || type.includes("promissory") || type.includes("finance")) return ICON_MAP.loan;
  if (type.includes("employment")) return ICON_MAP.employment;
  if (type.includes("policy") || type.includes("privacy") || type.includes("tos")) return ICON_MAP.policy;
  if (type.includes("investor") || type.includes("equity") || type.includes("safe")) return ICON_MAP.equity;
  if (type.includes("freelance") || type.includes("contractor")) return ICON_MAP.employment;
  return ICON_MAP.default;
};

const allContractOptions: ContractOption[] = Object.entries(CONTRACT_LIBRARY).map(([id, template]) => {
  const type = id as ContractType;
  return {
    id: type,
    label: template.label,
    description: template.description,
    icon: iconForType(type),
    basicsFields: fieldPresets[type] ?? BASE_FIELDS,
    toggles: togglePresets[type] ?? DEFAULT_TOGGLES,
  };
});

export function DraftWizard({ user, showBackLink = true }: DraftWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WizardData>(defaultData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<"login" | "plan" | null>(null);
  const [generating, setGenerating] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const [shakeField, setShakeField] = useState<string | null>(null);

  const selectedOption = useMemo(
    () => allContractOptions.find((option) => option.id === formData.contractType) ?? null,
    [formData.contractType]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as WizardData;
        setFormData({ ...defaultData, ...parsed });
      } catch (error) {
        console.error("Failed to parse draft wizard state", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateBasics = (name: string, value: string) => {
    fireAdsConversion("StartContract");
    setFormData((prev) => ({ ...prev, basics: { ...prev.basics, [name]: value } }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const updateToggle = (name: string, value: boolean) => {
    setFormData((prev) => ({ ...prev, toggles: { ...prev.toggles, [name]: value } }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  useEffect(() => {
    if (step === 2 && selectedOption) {
      const firstField = selectedOption.basicsFields[0]?.name;
      if (firstField && fieldRefs.current[firstField]) {
        fieldRefs.current[firstField]?.focus();
        fieldRefs.current[firstField]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [step, selectedOption]);

  const validateStep = (targetStep: number) => {
    const newErrors: Record<string, string> = {};
    if (targetStep === 1 && !formData.contractType) {
      newErrors.contractType = "Select a contract type to continue.";
    }
    if (targetStep === 2 && selectedOption) {
      selectedOption.basicsFields.forEach((field) => {
        if (!formData.basics[field.name]) {
          newErrors[field.name] = "This field is required.";
        }
      });
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      if (firstErrorKey) {
        const target = fieldRefs.current[firstErrorKey];
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.focus();
        }
        setShakeField(firstErrorKey);
        window.setTimeout(() => setShakeField(null), 500);
      }
    }
    return Object.keys(newErrors).length === 0;
  };

  const progressPercentage = ((step - 1) / (steps.length - 1)) * 100;
  const helperCopy = [
    "Tap a contract type below to start.",
    "Just answer these quick questions. Required fields have a red *.",
    "Toggle the clauses you want. You can edit later.",
    "Review everything and generate your contract.",
  ];

  const handleNext = () => {
    if (!validateStep(step === 1 ? 1 : step === 2 ? 2 : step)) return;
    setErrors({});
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const previewText = useMemo(() => {
    if (!selectedOption) return "Select a contract type to see the preview.";
    const partyA = formData.basics.partyOneName || "Party A";
    const partyB = formData.basics.partyTwoName || "Party B";
    const payment = formData.basics.paymentTerms || "Standard payment terms";
    const scope = formData.basics.scopeOfWork || "Described services";
    return `${selectedOption.label.toUpperCase()}\n\nThis agreement is between ${partyA} and ${partyB}. Services include ${scope}. Compensation: ${payment}. Additional notes: ${formData.notes || "N/A"}.`;
  }, [selectedOption, formData.basics, formData.notes]);

  const buildPayload = (): ContractFormPayload => {
    const basics = formData.basics;
    return {
      contractType: (formData.contractType as ContractFormPayload["contractType"]) ?? "general-service",
      partyOneName: basics.partyOneName || "Party A",
      partyTwoName: basics.partyTwoName || "Party B",
      partyOneAddress: basics.partyOneAddress || "",
      partyTwoAddress: basics.partyTwoAddress || "",
      effectiveDate: basics.effectiveDate || new Date().toISOString().split("T")[0],
      governingLaw: (basics.governingLaw || "CA") as ContractFormPayload["governingLaw"],
      termStart: basics.termStart || basics.effectiveDate || new Date().toISOString().split("T")[0],
      termEnd: basics.termEnd || "",
      relationshipSummary: basics.relationshipSummary || "",
      paymentTerms: basics.paymentTerms || "",
      paymentDetails: basics.paymentTerms || "",
      scopeOfWork: basics.scopeOfWork || "",
      deliverables: basics.deliverables || "",
      milestones: "",
      revisions: "",
      warrantyTerms: "",
      ownershipDetails: basics.ownershipDetails || "",
      propertyAddress: basics.propertyAddress || "",
      purchasePrice: basics.purchasePrice || "",
      depositAmount: basics.depositAmount || "",
      collateral: basics.collateral || "",
      interestRate: basics.interestRate || "",
      repaymentSchedule: basics.repaymentSchedule || "",
      lateFees: basics.lateFees || "",
      financePenalties: "",
      serviceGuarantees: "",
      plainSummaryIntro: formData.notes || "",
      customNotes: formData.notes,
      includeConfidentiality: formData.toggles.includeConfidentiality ?? false,
      includeIndemnification: formData.toggles.includeIndemnification ?? false,
      includeLiabilityCap: formData.toggles.includeLiabilityCap ?? false,
      includeNonSolicitation: formData.toggles.includeNonSolicitation ?? false,
      includeArbitration: formData.toggles.includeArbitration ?? false,
      includeIpOwnership: formData.toggles.includeIpOwnership ?? false,
      optionalClauses: formData.notes ? [formData.notes] : [],
    };
  };

  const handleGenerate = async () => {
    setServerError(null);
    if (!formData.contractType) {
      setErrors({ contractType: "Choose a contract type first." });
      return;
    }
    if (!user) {
      setModal("login");
      return;
    }
    if (!hasActivePlan(user.plan)) {
      setModal("plan");
      return;
    }
    setGenerating(true);
    try {
      const payload = buildPayload();
      const response = await fetch("/api/contracts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Unable to generate contract.");
      }
      const data = await response.json();
      if (typeof window !== "undefined") {
        window.location.href = `/contracts/${data.contractId}`;
      }
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setGenerating(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {allContractOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`rounded-3xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 ${
                formData.contractType === option.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"
              }`}
              onClick={() => {
                fireAdsConversion("StartContract");
                setFormData((prev) => ({ ...prev, contractType: option.id }));
                setErrors({});
                setStep(2);
              }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600" aria-hidden="true">
                {option.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{option.label}</h3>
              <p className="mt-1 text-sm text-slate-600">{option.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                Select <span aria-hidden className="ml-1">→</span>
              </span>
            </button>
          ))}
          {errors.contractType && <p className="text-sm text-red-600">{errors.contractType}</p>}
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-4">
          {selectedOption?.basicsFields.map((field) => {
            const fieldName = field.name;
            const hasError = Boolean(errors[fieldName]);
            return (
              <div key={field.name} className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-slate-900">
                  {field.label}
                  <span className="ml-1 text-red-500" aria-hidden>
                    *
                  </span>
                  {field.helper && <InfoTooltip text={field.helper} />}
                </label>
                <Input
                  ref={(el) => {
                    fieldRefs.current[fieldName] = el;
                  }}
                  type={field.type ?? "text"}
                  value={formData.basics[fieldName] ?? ""}
                  onChange={(event) => updateBasics(fieldName, event.target.value)}
                  placeholder={field.placeholder}
                  className={`mt-1 h-12 rounded-2xl border-2 text-base transition ${
                    hasError ? "border-red-500 bg-red-50 animate-pulse" : "border-slate-200 focus:border-blue-500"
                  } ${shakeField === fieldName ? "shake-field" : ""}`}
                  aria-invalid={hasError}
                />
                {hasError && <p className="text-xs text-red-600">{errors[fieldName]}</p>}
              </div>
            );
          })}
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="space-y-4">
          {selectedOption?.toggles.map((toggle) => (
            <label key={toggle.name} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={formData.toggles[toggle.name as string] ?? false}
                onChange={(event) => updateToggle(toggle.name, event.target.checked)}
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">{toggle.label}</p>
                <p className="text-xs text-slate-500">{toggle.helper}</p>
              </div>
            </label>
          ))}
          <Textarea
            rows={4}
            placeholder="Any custom clauses or reminders?"
            value={formData.notes}
            onChange={(event) => setFormData((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Summary</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li>
              <span className="font-semibold">Type:</span> {selectedOption?.label}
            </li>
            {selectedOption?.basicsFields.map((field) => (
              <li key={field.name}>
                <span className="font-semibold">{field.label}:</span>{" "}
                <span className={formData.basics[field.name] ? "" : "text-red-500"}>
                  {formData.basics[field.name] || "Missing"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Preview</h3>
          <div className="mt-2 h-64 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-800">
            <pre className="whitespace-pre-wrap font-sans">{previewText}</pre>
          </div>
        </div>
        {serverError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
            {serverError}{" "}
            <button type="button" className="font-semibold underline" onClick={handleGenerate}>
              Retry
            </button>
          </div>
        )}
        {!serverError && selectedOption && selectedOption.basicsFields.some((field) => !formData.basics[field.name]) && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            Some answers are missing.{" "}
            <button
              type="button"
              className="font-semibold underline"
              onClick={() => {
                setStep(2);
                const missing = selectedOption.basicsFields.find((field) => !formData.basics[field.name]);
                if (missing && fieldRefs.current[missing.name]) {
                  fieldRefs.current[missing.name]?.scrollIntoView({ behavior: "smooth", block: "center" });
                  fieldRefs.current[missing.name]?.focus();
                }
              }}
            >
              Fix issues automatically
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6">
      {showBackLink && (
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <span aria-hidden="true">←</span>
          Back to contract list
        </Link>
      )}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Draft</p>
            <h1 className="mt-2 text-3xl font-semibold">Create a contract in four taps.</h1>
            <p className="text-sm text-slate-600">
              No distractions, no confusion—just choose, fill, review, and generate.{" "}
              <Link href="/about" className="font-semibold text-blue-700 underline-offset-4 hover:underline">
                Learn more about Make My Contract
              </Link>
              .
            </p>
          </div>
          <div className="text-right text-sm text-slate-500">
            Step {step} of {steps.length}
          </div>
        </div>
        {/* <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          PDF downloads unlock with a quick subscription—fill everything in first, we’ll save your progress automatically. Every
          contract lives in your dashboard with secure storage and version history, so nothing gets lost.
        </div> */}
        <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Save every contract in your dashboard</p>
              <p className="mt-1 text-sm text-slate-600">
                Each generated agreement drops into your dashboard with instant download links, resend options, and version history.
              </p>
            </div>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/dashboard">View dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="mt-6 h-2 w-full rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${progressPercentage}%` }} aria-hidden="true" />
        </div>

        <div className="mt-6 space-y-6" id="wizard-helper">
          <p className="text-sm text-slate-500">{helperCopy[step - 1]}</p>
          {renderStep()}
          <div className="hidden flex-wrap gap-3 sm:flex">
            {step > 1 && (
              <Button type="button" variant="secondary" onClick={handleBack} className="px-6 py-3">
                Back
              </Button>
            )}
            {step < steps.length && (
              <Button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 shadow-md transition active:scale-[0.98]"
                title={Object.keys(errors).length > 0 ? "Please complete required fields." : undefined}
              >
                Next
              </Button>
            )}
            {step === steps.length && (
              <Button
                type="button"
                onClick={handleGenerate}
                disabled={generating}
                className="px-6 py-3 shadow-md transition active:scale-[0.98]"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating...
                  </span>
                ) : (
                  "Generate my contract"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            {modal === "login" ? (
              <>
                <h3 className="text-lg font-semibold text-slate-900">Create a free account</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Save your progress and finish the contract in seconds. We&apos;ll restore this draft right after you log in.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button asChild>
                    <Link href="/signup?redirect=/draft">Sign up</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/login?redirect=/draft">Login</Link>
                  </Button>
                  <button
                    type="button"
                    className="text-sm font-semibold text-slate-500 hover:text-slate-900"
                    onClick={() => setModal(null)}
                  >
                    Keep editing
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-slate-900">Upgrade to unlock downloads</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your draft is ready. Upgrade once to generate unlimited PDFs and keep every contract in your dashboard.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button asChild>
                    <Link href="/pricing">View plans</Link>
                  </Button>
                  <button
                    type="button"
                    className="text-sm font-semibold text-slate-500 hover:text-slate-900"
                    onClick={() => setModal(null)}
                  >
                    Maybe later
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:hidden">
        <div className="flex items-center justify-between gap-3">
            <Button type="button" variant="secondary" onClick={handleBack} disabled={step === 1} className="flex-1 py-4">
            Back
          </Button>
          {step < steps.length ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 py-4 text-base"
              >
              Next
            </Button>
          ) : (
            <Button type="button" onClick={handleGenerate} disabled={generating} className="flex-1 py-4 text-base">
              {generating ? "Generating..." : "Generate"}
            </Button>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes field-shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          50% {
            transform: translateX(4px);
          }
          75% {
            transform: translateX(-4px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .shake-field {
          animation: field-shake 0.3s ease;
        }
      `}</style>
    </div>
  );
}
