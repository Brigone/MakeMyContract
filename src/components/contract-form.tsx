"use client";

import { useState } from "react";
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

interface ContractFormProps {
  contractType: ContractType;
}

const helper = (text: string) => (
  <p className="text-xs text-slate-500">{text}</p>
);

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs text-red-600">{message}</p> : null;

export function ContractForm({ contractType }: ContractFormProps) {
  const template = CONTRACT_LIBRARY[contractType];
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clauseOptions = [
    {
      label: "Privacy & quiet enjoyment",
      helper: "Keeps tenant data and house rules discreet.",
      name: "includeConfidentiality",
    },
    {
      label: "Listing assets & photos",
      helper: "Clarifies who owns furnishings, photos, and marketing assets.",
      name: "includeIpOwnership",
    },
    {
      label: "Damage & indemnification",
      helper: "Requires a party to cover losses or damage they cause.",
      name: "includeIndemnification",
    },
    {
      label: "Liability limits",
      helper: "Caps damages to a predictable amount.",
      name: "includeLiabilityCap",
    },
    {
      label: "Non-solicitation & no poaching",
      helper: "Prevents tenants from subletting or poaching staff without permission.",
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
        throw new Error(errorBody?.error ?? "Unable to generate the rental form right now.");
      }
      const data = await response.json();
      router.push(`/contracts/${data.contractId}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unexpected error. Please try again.");
    }
  };

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
          <h3 className="text-lg font-semibold text-slate-900">Landlord & tenant information</h3>
          <p className="mt-1 text-sm text-slate-700">
            Identify who is signing and where notices or rent reminders should be delivered.
          </p>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-slate-900">
              Landlord or host legal name
              {helper("Typically your LLC, trust, or property management company.")}
              <Input placeholder="Oakview Homes LLC" {...register("partyOneName")} />
              <FieldError message={errors.partyOneName?.message} />
            </label>
            <label className="block text-sm font-medium text-slate-900">
              Landlord mailing address
              {helper("Street, city, state, and ZIP for formal notices or rent payments.")}
              <Input placeholder="123 Market St, San Francisco, CA" {...register("partyOneAddress")} />
              <FieldError message={errors.partyOneAddress?.message} />
            </label>
            <label className="block text-sm font-medium text-slate-900">
              Tenant or guest legal name
              {helper("Add every occupant or responsible party who must sign.")}
              <Input placeholder="Jordan Ellis" {...register("partyTwoName")} />
              <FieldError message={errors.partyTwoName?.message} />
            </label>
            <label className="block text-sm font-medium text-slate-900">
              Tenant mailing address
              {helper("Use the tenant’s current or forwarding address for notices.")}
              <Input placeholder="200 Liberty St, New York, NY" {...register("partyTwoAddress")} />
              <FieldError message={errors.partyTwoAddress?.message} />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Dates & governing law</h3>
          <p className="mt-1 text-sm text-slate-700">
            Lock in the lease start, end, renewal cadence, and the state that will govern disputes.
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
          Summaries appear above the legal text so landlords, tenants, and co-signers can understand the clause instantly.
        </p>
        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium text-slate-900">
            Relationship summary
            {helper("Describe how the landlord and tenant plan to use the property.")}
            <Textarea rows={3} placeholder="Example: Landlord rents 214 Oakview Dr. to Tenant for a 12-month term at $2,150 per month with one pet addendum attached." {...register("relationshipSummary")} />
            <FieldError message={errors.relationshipSummary?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Plain-English intro (optional)
            {helper("Add a headline summary that appears at the top of the rental form.")}
            <Textarea rows={2} placeholder="In plain English: This lease covers rent, utilities, quiet hours, and deposit rules for 214 Oakview Dr." {...register("plainSummaryIntro")} />
            <FieldError message={errors.plainSummaryIntro?.message} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Property details & house rules</h3>
        <p className="mt-1 text-sm text-slate-700">
          Capture how the property will be used so the rental form mirrors reality.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Property description & inclusions
            <Textarea rows={4} placeholder="Describe the property, unit number, furnishings, parking, appliances, or amenities that are included." {...register("scopeOfWork")} />
            <FieldError message={errors.scopeOfWork?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Tenant responsibilities & restrictions
            <Textarea rows={4} placeholder="List cleaning expectations, trash rules, amenity usage, guest limits, or HOA requirements." {...register("deliverables")} />
            <FieldError message={errors.deliverables?.message} />
          </label>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Move-in timeline & inspections
            <Textarea rows={3} placeholder="Move-in date, key exchange details, inspection walkthroughs, or renewal checkpoints." {...register("milestones")} />
            <FieldError message={errors.milestones?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Change requests or addendums
            <Textarea rows={3} placeholder="How to request pet approval, add roommates, or adjust lease terms." {...register("revisions")} />
            <FieldError message={errors.revisions?.message} />
          </label>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-900">
            Maintenance response & guarantees
            <Textarea rows={3} placeholder="Any promised response times, service levels, landscaping duties, or seasonal maintenance." {...register("serviceGuarantees")} />
            <FieldError message={errors.serviceGuarantees?.message} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Rent & financial terms</h3>
        <p className="mt-1 text-sm text-slate-700">
          Record rent, billing cadence, escalations, and any collateral or penalties.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Rent summary
            <Textarea rows={3} placeholder="Example: $2,150 monthly rent due on the 1st with $75 pet rent and utilities paid by tenant." {...register("paymentDetails")} />
            <FieldError message={errors.paymentDetails?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Billing & adjustments
            <Textarea rows={3} placeholder="Escrow details, proration rules, utilities, or rent increase cadence." {...register("paymentTerms")} />
            <FieldError message={errors.paymentTerms?.message} />
          </label>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Rent escalations or interest
            <Input placeholder="Example: 3% increase after 12 months" {...register("interestRate")} />
            <FieldError message={errors.interestRate?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Payment schedule
            <Input placeholder="Example: Monthly installments with prorated first month" {...register("repaymentSchedule")} />
            <FieldError message={errors.repaymentSchedule?.message} />
          </label>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-900">
            Collateral or guaranty
            <Input placeholder="Describe guarantors, co-signers, or collateral being pledged." {...register("collateral")} />
            <FieldError message={errors.collateral?.message} />
          </label>
          <label className="block text-sm font-medium text-slate-900">
            Late fees & penalties
            <Input placeholder="Example: $75 late fee after the 5th or 5% of outstanding balance." {...register("lateFees")} />
            <FieldError message={errors.lateFees?.message} />
          </label>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-900">
            Remedies for unpaid rent
            <Textarea rows={3} placeholder="Detail cure periods, acceleration triggers, or eviction language." {...register("financePenalties")} />
            <FieldError message={errors.financePenalties?.message} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Property or asset details</h3>
        <p className="mt-1 text-sm text-slate-700">
          Use these fields for leases, move-ins, or short-term stays.
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
            Ownership or listing rights
            <Textarea rows={3} placeholder="Clarify who owns the property, photos, furnishings, or any creative assets used in listings." {...register("ownershipDetails")} />
            <FieldError message={errors.ownershipDetails?.message} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Protective clauses</h3>
        <p className="mt-1 text-sm text-slate-700">
          Toggle the clauses you want the rental engine to include. They are enabled by default.
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
              Add bespoke rental language that should appear as its own clause.
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
            No custom clauses yet. Add one if you need something highly specific for your rental.
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Final notes</h3>
        <p className="mt-1 text-sm text-slate-700">
          Anything else the rental form should call out? Add it here and it will appear as an additional clause.
        </p>
        <Textarea rows={4} placeholder="Example: Note that the move-in checklist is attached and pet photos are on file." {...register("customNotes")} />
        <FieldError message={errors.customNotes?.message} />
      </div>

      {submitError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600">
          By generating this rental form, you confirm you have authority to sign on behalf of the listed parties.
        </p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Preparing your rental form..." : "Generate lease"}
        </Button>
      </div>
    </form>
  );
}
