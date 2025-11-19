"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  useFieldArray,
  useForm,
  type Resolver,
  type FieldArrayPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ContractType } from "@/types/contracts";
import { CONTRACT_LIBRARY } from "@/lib/contracts-engine";
import { contractFormSchema, type ContractFormValues } from "@/lib/validators";
import { US_STATES } from "@/constants/us-states";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clearDraft, getDraft, saveDraft } from "@/lib/draft-storage";

interface ContractFormProps {
  contractType: ContractType;
  isAuthenticated: boolean;
  hasActiveSubscription: boolean;
}

const helper = (text: string) => <p className="text-xs text-slate-500">{text}</p>;

const FieldLabel = ({ children, className }: { children: ReactNode; className?: string }) => (
  <label
    className={`group block text-sm font-semibold text-slate-900 transition focus-within:text-blue-900 ${className ?? ""}`.trim()}
  >
    {children}
  </label>
);

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-red-600" role="alert" aria-live="polite">
      {message}
    </p>
  ) : null;

export function ContractForm({ contractType, isAuthenticated, hasActiveSubscription }: ContractFormProps) {
  const template = CONTRACT_LIBRARY[contractType];
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const autoSaveTimeout = useRef<number | null>(null);

  const clauseOptions = [
    {
      label: "Confidentiality",
      helper: "Keeps sensitive information private.",
      name: "includeConfidentiality",
    },
    {
      label: "IP ownership",
      helper: "Clarifies who owns deliverables.",
      name: "includeIpOwnership",
    },
    {
      label: "Indemnification",
      helper: "Requires a party to cover losses they cause.",
      name: "includeIndemnification",
    },
    {
      label: "Limitation of liability",
      helper: "Caps damages to a predictable amount.",
      name: "includeLiabilityCap",
    },
    {
      label: "Non-solicitation",
      helper: "Prevents poaching employees or clients.",
      name: "includeNonSolicitation",
    },
    {
      label: "Arbitration",
      helper: "Resolves disputes outside of court.",
      name: "includeArbitration",
    },
  ] as const;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
    reset,
  } = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema) as Resolver<ContractFormValues>,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      contractType,
      partyOneName: "",
      partyOneAddress: "",
      partyTwoName: "",
      partyTwoAddress: "",
      effectiveDate: new Date().toISOString().split("T")[0],
      termStart: "",
      termEnd: "",
      governingLaw: "CA",
      relationshipSummary: "",
      scopeOfWork: "",
      deliverables: "",
      milestones: "",
      paymentTerms: "",
      paymentDetails: "",
      warrantyTerms: "",
      revisions: "",
      serviceGuarantees: "",
      ownershipDetails: "",
      propertyAddress: "",
      purchasePrice: "",
      depositAmount: "",
      collateral: "",
      interestRate: "",
      repaymentSchedule: "",
      lateFees: "",
      financePenalties: "",
      plainSummaryIntro: "",
      optionalClauses: [],
      includeConfidentiality: true,
      includeIndemnification: true,
      includeLiabilityCap: true,
      includeNonSolicitation: true,
      includeArbitration: true,
      includeIpOwnership: true,
    },
  });

  const { fields, append, remove } = useFieldArray<
    ContractFormValues,
    FieldArrayPath<ContractFormValues>,
    "id"
  >({
    control,
    name: "optionalClauses" as FieldArrayPath<ContractFormValues>,
  });

  const optionalClauses = watch("optionalClauses");

  useEffect(() => {
    const draft = getDraft();
    if (!draft) return;
    if (draft.contractType !== contractType) return;
    if (typeof window === "undefined") return;
    const currentPath = window.location.pathname + window.location.search;
    if (draft.path !== currentPath) return;
    reset({ ...draft.values, contractType });
  }, [contractType, reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (typeof window === "undefined") {
        return;
      }
      if (autoSaveTimeout.current) {
        window.clearTimeout(autoSaveTimeout.current);
      }
      autoSaveTimeout.current = window.setTimeout(() => {
        saveDraft({
          path: window.location.pathname + window.location.search,
          contractType,
          values: values as ContractFormValues,
          savedAt: Date.now(),
        });
      }, 400);
    });
    return () => {
      subscription.unsubscribe();
      if (autoSaveTimeout.current) {
        window.clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [contractType, watch]);

  const requiresUpgrade = !(isAuthenticated && hasActiveSubscription);

  const persistDraft = useCallback(() => {
    if (typeof window === "undefined") return;
    const values = getValues();
    saveDraft({
      path: window.location.pathname + window.location.search,
      contractType,
      values,
      savedAt: Date.now(),
    });
  }, [contractType, getValues]);

  const onSubmit = async (values: ContractFormValues) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contracts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.error ?? "Unable to generate the contract right now.");
      }
      const data = await response.json();
      clearDraft();
      router.push(`/contracts/${data.contractId}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unexpected error. Please try again.");
    }
  };

  const handleUpgradeRedirect = useCallback(() => {
    persistDraft();
    router.push(isAuthenticated ? "/pricing" : "/signup");
  }, [isAuthenticated, persistDraft, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <input type="hidden" {...register("contractType")} />

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge>{template.categoryLabel}</Badge>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {template.label}
            </h2>
            <p className="text-sm text-slate-700">
              {template.description}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-sm">
            <p className="font-semibold text-slate-900">What you&apos;ll need</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {template.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Party information</h3>
          <p className="mt-1 text-sm text-slate-700">
            Identify who is signing and where notices should be delivered.
          </p>
          <div className="mt-4 space-y-4">
            <FieldLabel>
              Party A legal name
              {helper("Typically your company or the service provider.")}
              <Input placeholder="Acme Studios LLC" {...register("partyOneName")} aria-invalid={Boolean(errors.partyOneName)} />
              <FieldError message={errors.partyOneName?.message} />
            </FieldLabel>
            <FieldLabel>
              Party A address
              {helper("Street, city, state, and ZIP for formal notices.")}
              <Input placeholder="123 Market St, San Francisco, CA" {...register("partyOneAddress")} aria-invalid={Boolean(errors.partyOneAddress)} />
              <FieldError message={errors.partyOneAddress?.message} />
            </FieldLabel>
            <FieldLabel>
              Party B legal name
              {helper("Client, counterparty, or recipient of the services.")}
              <Input placeholder="Northwind Ventures Inc." {...register("partyTwoName")} aria-invalid={Boolean(errors.partyTwoName)} />
              <FieldError message={errors.partyTwoName?.message} />
            </FieldLabel>
            <FieldLabel>
              Party B address
              {helper("Use the official mailing address for notices.")}
              <Input placeholder="200 Liberty St, New York, NY" {...register("partyTwoAddress")} aria-invalid={Boolean(errors.partyTwoAddress)} />
              <FieldError message={errors.partyTwoAddress?.message} />
            </FieldLabel>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Dates & governing law</h3>
          <p className="mt-1 text-sm text-slate-700">
            Lock in the effective date, term, and the state that will govern disputes.
          </p>
          <div className="mt-4 space-y-4">
            <FieldLabel>
              Effective date
              <Input type="date" {...register("effectiveDate")} aria-invalid={Boolean(errors.effectiveDate)} />
              <FieldError message={errors.effectiveDate?.message} />
            </FieldLabel>
            <div className="grid gap-4 md:grid-cols-2">
              <FieldLabel>
                Term start
                <Input type="date" {...register("termStart")} aria-invalid={Boolean(errors.termStart)} />
                <FieldError message={errors.termStart?.message} />
              </FieldLabel>
              <FieldLabel>
                Term end
                <Input type="date" {...register("termEnd")} aria-invalid={Boolean(errors.termEnd)} />
                <FieldError message={errors.termEnd?.message} />
              </FieldLabel>
            </div>
            <FieldLabel>
              Governing law (state)
              <Select {...register("governingLaw")} aria-invalid={Boolean(errors.governingLaw)}>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.governingLaw?.message} />
            </FieldLabel>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Plain-English summary</h3>
        <p className="mt-1 text-sm text-slate-700">
          Summaries appear above the legal text so anyone can understand the clause instantly.
        </p>
        <div className="mt-4 space-y-4">
          <FieldLabel>
            Relationship summary
            {helper("Describe how the parties plan to work together.")}
            <Textarea rows={3} placeholder="Example: Maker Studio will design and implement a new brand system for Atlas Homes." {...register("relationshipSummary")} aria-invalid={Boolean(errors.relationshipSummary)} />
            <FieldError message={errors.relationshipSummary?.message} />
          </FieldLabel>
          <FieldLabel>
            Plain-English intro (optional)
            {helper("Add a headline summary that appears at the top of the agreement.")}
            <Textarea rows={2} placeholder="In plain English: We are outlining scope, IP ownership, and payment expectations for this project." {...register("plainSummaryIntro")} aria-invalid={Boolean(errors.plainSummaryIntro)} />
            <FieldError message={errors.plainSummaryIntro?.message} />
          </FieldLabel>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Scope & deliverables</h3>
        <p className="mt-1 text-sm text-slate-700">
          Capture what is being provided so the contract mirrors the actual work.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <FieldLabel>
            Scope of work
            <Textarea rows={4} placeholder="Outline responsibilities, services, or engagement scope." {...register("scopeOfWork")} aria-invalid={Boolean(errors.scopeOfWork)} />
            <FieldError message={errors.scopeOfWork?.message} />
          </FieldLabel>
          <FieldLabel>
            Deliverables
            <Textarea rows={4} placeholder="List key deliverables, documents, or assets that will be handed off." {...register("deliverables")} aria-invalid={Boolean(errors.deliverables)} />
            <FieldError message={errors.deliverables?.message} />
          </FieldLabel>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <FieldLabel>
            Milestones & timeline
            <Textarea rows={3} placeholder="Milestone schedule, demo dates, checkpoints." {...register("milestones")} aria-invalid={Boolean(errors.milestones)} />
            <FieldError message={errors.milestones?.message} />
          </FieldLabel>
          <FieldLabel>
            Revision policy
            <Textarea rows={3} placeholder="Number of revisions, turnaround expectations, change order process." {...register("revisions")} aria-invalid={Boolean(errors.revisions)} />
            <FieldError message={errors.revisions?.message} />
          </FieldLabel>
        </div>
        <div className="mt-4">
          <FieldLabel>
            Service guarantees
            <Textarea rows={3} placeholder="Any uptime commitments, response times, satisfaction guarantees." {...register("serviceGuarantees")} aria-invalid={Boolean(errors.serviceGuarantees)} />
            <FieldError message={errors.serviceGuarantees?.message} />
          </FieldLabel>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Payment & financial terms</h3>
        <p className="mt-1 text-sm text-slate-700">
          Record fees, billing cadence, and any collateral or penalties.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <FieldLabel>
            Payment summary
            <Textarea rows={3} placeholder="Example: $8,000 retainer due upfront, remaining balance Net 15." {...register("paymentDetails")} aria-invalid={Boolean(errors.paymentDetails)} />
            <FieldError message={errors.paymentDetails?.message} />
          </FieldLabel>
          <FieldLabel>
            Additional terms
            <Textarea rows={3} placeholder="Escrow details, reimbursable expenses, or proration rules." {...register("paymentTerms")} aria-invalid={Boolean(errors.paymentTerms)} />
            <FieldError message={errors.paymentTerms?.message} />
          </FieldLabel>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <FieldLabel>
            Interest rate
            <Input placeholder="Example: 6% APR" {...register("interestRate")} aria-invalid={Boolean(errors.interestRate)} />
            <FieldError message={errors.interestRate?.message} />
          </FieldLabel>
          <FieldLabel>
            Repayment schedule
            <Input placeholder="Example: Monthly installments for 12 months" {...register("repaymentSchedule")} aria-invalid={Boolean(errors.repaymentSchedule)} />
            <FieldError message={errors.repaymentSchedule?.message} />
          </FieldLabel>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <FieldLabel>
            Collateral
            <Input placeholder="Describe collateral or leave blank for unsecured." {...register("collateral")} aria-invalid={Boolean(errors.collateral)} />
            <FieldError message={errors.collateral?.message} />
          </FieldLabel>
          <FieldLabel>
            Late fees & penalties
            <Input placeholder="Example: 1.5% per month after 15 days" {...register("lateFees")} aria-invalid={Boolean(errors.lateFees)} />
            <FieldError message={errors.lateFees?.message} />
          </FieldLabel>
        </div>
        <div className="mt-4">
          <FieldLabel>
            Finance penalties or acceleration language
            <Textarea rows={3} placeholder="Detail late payment penalties, acceleration triggers, or default remedies." {...register("financePenalties")} aria-invalid={Boolean(errors.financePenalties)} />
            <FieldError message={errors.financePenalties?.message} />
          </FieldLabel>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Property or asset details</h3>
        <p className="mt-1 text-sm text-slate-700">
          Use these fields for leases, purchases, or asset transfers.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <FieldLabel>
            Property or asset address
            <Input placeholder="123 Palm Ave, Austin, TX 78701" {...register("propertyAddress")} aria-invalid={Boolean(errors.propertyAddress)} />
            <FieldError message={errors.propertyAddress?.message} />
          </FieldLabel>
          <FieldLabel>
            Purchase price or rent
            <Input placeholder="$2,850 per month / $850,000 purchase" {...register("purchasePrice")} aria-invalid={Boolean(errors.purchasePrice)} />
            <FieldError message={errors.purchasePrice?.message} />
          </FieldLabel>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <FieldLabel>
            Deposit or escrow
            <Input placeholder="Example: $5,000 security deposit" {...register("depositAmount")} aria-invalid={Boolean(errors.depositAmount)} />
            <FieldError message={errors.depositAmount?.message} />
          </FieldLabel>
          <FieldLabel>
            Ownership or IP rights
            <Textarea rows={3} placeholder="Specify who owns final work product or licenses granted." {...register("ownershipDetails")} aria-invalid={Boolean(errors.ownershipDetails)} />
            <FieldError message={errors.ownershipDetails?.message} />
          </FieldLabel>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Protective clauses</h3>
        <p className="mt-1 text-sm text-slate-700">
          Toggle the clauses you want the engine to include. They are enabled by default.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {clauseOptions.map(({ label, helper: copy, name }) => (
            <label
              key={name}
              className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 shadow-sm transition hover:border-blue-200"
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                {...register(name)}
              />
              <div>
                <p className="font-semibold text-slate-900">{label}</p>
                <p className="text-xs text-slate-600">{copy}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Custom clauses</h3>
            <p className="text-sm text-slate-700">
              Add bespoke language that should appear as its own clause.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => append("")}
          >
            Add clause
          </Button>
        </div>
        {optionalClauses?.length ? (
          <div className="mt-4 space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Custom clause {index + 1}</p>
                  <button
                    type="button"
                    className="text-xs text-slate-500 hover:text-red-600"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
                <Textarea
                  rows={4}
                  className="mt-3"
                  placeholder="Paste or draft your custom clause here."
                  {...register(`optionalClauses.${index}` as const)}
                />
                <FieldError message={errors.optionalClauses?.[index]?.message} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">
            No custom clauses yet. Add one if you need something highly specific.
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Final notes</h3>
        <p className="mt-1 text-sm text-slate-700">
          Anything else the contract should call out? Add it here and it will appear as an additional clause.
        </p>
        <FieldLabel className="mt-4">
          Additional instruction
          <Textarea rows={4} placeholder="Example: Add a reminder to attach Statement of Work #3." {...register("customNotes")} aria-invalid={Boolean(errors.customNotes)} />
          <FieldError message={errors.customNotes?.message} />
        </FieldLabel>
      </div>

      {requiresUpgrade && (
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 shadow-sm">
          <p className="font-semibold text-blue-900">Sign up to continue</p>
          <p className="mt-1 text-blue-900/80">
            You can edit every field for free. When you need the PDF, tap below—we save this draft to your device and bring you
            right back here after signup and checkout.
          </p>
          <Button type="button" className="mt-3 w-full md:w-auto" onClick={handleUpgradeRedirect}>
            Sign up to continue
          </Button>
        </div>
      )}

      {submitError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600">
          By generating this contract, you confirm you have authority to sign on behalf of the listed parties.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {requiresUpgrade ? (
            <Button type="button" onClick={handleUpgradeRedirect} className="w-full sm:w-auto">
              Sign up to continue
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Preparing your contract..." : "Download contract"}
            </Button>
          )}
          {/* <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={persistDraft}>
            Save progress
          </Button> */}
        </div>
      </div>
    </form>
  );
}
