import { notFound } from "next/navigation";
import { CONTRACT_LIBRARY } from "@/lib/contracts-engine";
import type { ContractType } from "@/types/contracts";
import { Badge } from "@/components/ui/badge";
import { ContractForm } from "@/components/contract-form";
import { getCurrentUser } from "@/lib/auth";

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

interface ContractCreatePageProps {
  params: Promise<{ type: string }> | { type: string };
}

export default async function ContractCreatePage({ params }: ContractCreatePageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const template = CONTRACT_LIBRARY[resolvedParams.type as ContractType];
  if (!template) {
    notFound();
  }
  const user = await getCurrentUser();
  const planActive = user ? hasActivePlan(user.plan) : false;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 text-slate-700">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl">
        <Badge>Contract intake</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">{template.label}</h1>
        <p className="mt-2 text-sm text-slate-900">{template.description}</p>
        <div className="mt-6 border-t border-slate-200 pt-6">
          <ContractForm
            contractType={resolvedParams.type as ContractType}
            isAuthenticated={Boolean(user)}
            hasActiveSubscription={planActive}
          />
        </div>
      </div>
    </div>
  );
}
