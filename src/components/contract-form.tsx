"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const helper = (text: string) => (
  <p className="text-xs text-slate-500">{text}</p>
);

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs text-red-600">{message}</p> : null;

export function ContractForm({ contractType, isAuthenticated, hasActiveSubscription }: ContractFormProps) {
  const template = CONTRACT_LIBRARY[contractType];
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    mode: "onBlur",
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

  const requiresUpgrade = !(isAuthenticated && hasActiveSubscription);

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
    const values = getValues();
    if (typeof window !== "undefined") {
      saveDraft({
        path: window.location.pathname + window.location.search,
        contractType,
        values,
        savedAt: Date.now(),
      });
    }
    router.push(isAuthenticated ? "/pricing" : "/signup");
  }, [contractType, getValues, isAuthenticated, router]);

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
            <label className="block text-sm font-medium text-slate-900">
              Party A legal name
              {helper("Typically your company or the service provider.")}
              <Input placeholder="Acme Studios LLC" {...register("partyOneName")} />
              <FieldError message={errors.partyOneName?.message} />
            </label>
            <label className="block text-sm font-medium text-slate-900">
              Party A address
              {helper("Street, city, state, and ZIP for formal notices.")}
              <Input placeholder="123 Market St, San Francisco, CA" {...register("partyOneAddress")} />
              <FieldError message={errors.partyOneAddress?.message} />
            </label>
            <label className="block text-sm font-medium text-slate-900">
              Party B legal name
              {helper("Client, counterparty, or recipient of the services.")}
              <Input placeholder="Northwind Ventures Inc." {...register("partyTwoName")} />
              <FieldError message={errors.partyTwoName?.message} />
            </label>
            <label className="block text-sm font-medium text-slate-900">
              Party B address
              {helper("Use the official mailing address for notices.")}
              <Input placeholder="200 Liberty St, New York, NY" {...register("partyTwoAddress")} />
              <FieldError message={errors.partyTwoAddress?.message} />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Dates & governing law</h3>
          <p className="mt-1 text-sm text-slate-700">
            Lock in the effective date, term, and the state that will govern disputes.
          </p>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-slate-900">
              Effective date
              <Input type="date" {...register("effectiveDate")} />
              <FieldError message={errors.effectiveDate?.message} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-900">
                Term start
                <Input type="date" {...register("termStart")} />
                <FieldError message={errors.termStart?.message} />
              </label>
              <label className="block text-sm font-medium text-slate-900">
                Term end
                <Input type="date" {...register("termEnd")} />
                <FieldError message={errors.termEnd?.message} />
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-900">
              Governing law (state)
              <Select {...register("governingLaw")}>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.governingLaw?.message} />
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Plain-English summary</h3>
        <p className="mt-1 text-sm text-slate-700">
          Summaries appear above the legal text so anyone can understand the clause instantly.
        </p>
        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-slate-900">
            Relationship summary
            {helper("Describe how the parties plan to work together.")}
            <Textarea rows={3} placeholder="Example: Maker Studio will design and implement a new brand system for Atlas Homes." {...register("relationshipSummary")} />
            <FieldError message={errors.relationshipSummary?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Plain-English intro (optional)
            {helper("Add a headline summary that appears at the top of the agreement.")}
            <Textarea rows={2} placeholder="In plain English: We are outlining scope, IP ownership, and payment expectations for this project." {...register("plainSummaryIntro")} />
            <FieldError message={errors.plainSummaryIntro?.message} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Scope & deliverables</h3>
        <p className="mt-1 text-sm text-slate-700">
          Capture what is being provided so the contract mirrors the actual work.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Scope of work
            <Textarea rows={4} placeholder="Outline responsibilities, services, or engagement scope." {...register("scopeOfWork")} />
            <FieldError message={errors.scopeOfWork?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Deliverables
            <Textarea rows={4} placeholder="List key deliverables, documents, or assets that will be handed off." {...register("deliverables")} />
            <FieldError message={errors.deliverables?.message} />
          </label>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Milestones & timeline
            <Textarea rows={3} placeholder="Milestone schedule, demo dates, checkpoints." {...register("milestones")} />
            <FieldError message={errors.milestones?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Revision policy
            <Textarea rows={3} placeholder="Number of revisions, turnaround expectations, change order process." {...register("revisions")} />
            <FieldError message={errors.revisions?.message} />
          </label>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-900">
            Service guarantees
            <Textarea rows={3} placeholder="Any uptime commitments, response times, satisfaction guarantees." {...register("serviceGuarantees")} />
            <FieldError message={errors.serviceGuarantees?.message} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Payment & financial terms</h3>
        <p className="mt-1 text-sm text-slate-700">
          Record fees, billing cadence, and any collateral or penalties.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Payment summary
            <Textarea rows={3} placeholder="Example: $8,000 retainer due upfront, remaining balance Net 15." {...register("paymentDetails")} />
            <FieldError message={errors.paymentDetails?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Additional terms
            <Textarea rows={3} placeholder="Escrow details, reimbursable expenses, or proration rules." {...register("paymentTerms")} />
            <FieldError message={errors.paymentTerms?.message} />
          </label>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Interest rate
            <Input placeholder="Example: 6% APR" {...register("interestRate")} />
            <FieldError message={errors.interestRate?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Repayment schedule
            <Input placeholder="Example: Monthly installments for 12 months" {...register("repaymentSchedule")} />
            <FieldError message={errors.repaymentSchedule?.message} />
          </label>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Collateral
            <Input placeholder="Describe collateral or leave blank for unsecured." {...register("collateral")} />
            <FieldError message={errors.collateral?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Late fees & penalties
            <Input placeholder="Example: 1.5% per month after 15 days" {...register("lateFees")} />
            <FieldError message={errors.lateFees?.message} />
          </label>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-900">
            Finance penalties or acceleration language
            <Textarea rows={3} placeholder="Detail late payment penalties, acceleration triggers, or default remedies." {...register("financePenalties")} />
            <FieldError message={errors.financePenalties?.message} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Property or asset details</h3>
        <p className="mt-1 text-sm text-slate-700">
          Use these fields for leases, purchases, or asset transfers.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Property or asset address
            <Input placeholder="123 Palm Ave, Austin, TX 78701" {...register("propertyAddress")} />
            <FieldError message={errors.propertyAddress?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Purchase price or rent
            <Input placeholder="$2,850 per month / $850,000 purchase" {...register("purchasePrice")} />
            <FieldError message={errors.purchasePrice?.message} />
          </label>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Deposit or escrow
            <Input placeholder="Example: $5,000 security deposit" {...register("depositAmount")} />
            <FieldError message={errors.depositAmount?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Ownership or IP rights
            <Textarea rows={3} placeholder="Specify who owns final work product or licenses granted." {...register("ownershipDetails")} />
            <FieldError message={errors.ownershipDetails?.message} />
          </label>
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
        <Textarea rows={4} placeholder="Example: Add a reminder to attach Statement of Work #3." {...register("customNotes")} />
        <FieldError message={errors.customNotes?.message} />
      </div>

       {requiresUpgrade && (
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 shadow-sm">
          <p className="font-semibold text-blue-900">Upgrade required to generate</p>
          <p className="mt-1">
            You’re editing this template in the public builder. Create your account and upgrade to generate PDFs, store history,
            and continue where you left off.
          </p>
          <Link href="/signup" className="mt-3 inline-flex font-semibold text-blue-800 underline-offset-4 hover:underline">
            Upgrade now
          </Link>
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
        {requiresUpgrade ? (
          <Button type="button" onClick={handleUpgradeRedirect}>
            Upgrade now
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Preparing your contract..." : "Generate contract"}
          </Button>
        )}
      </div>
    </form>
  );
}
