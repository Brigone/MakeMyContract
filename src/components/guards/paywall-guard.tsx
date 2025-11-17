import type { SubscriptionPlan } from "@/types/contracts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaywallGuardProps {
  plan: SubscriptionPlan;
  children: React.ReactNode;
}

const isActivePlan = (plan: SubscriptionPlan) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

export function PaywallGuard({ plan, children }: PaywallGuardProps) {
  if (isActivePlan(plan)) {
    return <>{children}</>;
  }

  const target = plan === "expired" ? "/paywall/expired" : "/paywall/must-subscribe";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-lg">
      <h3 className="text-2xl font-semibold text-slate-900">Subscription Required</h3>
      <p className="mt-2 text-sm text-slate-800">
        An active Make My Rental subscription is required to access this workspace.
      </p>
      <div className="mt-6 flex justify-center">
        <Button asChild>
          <Link href={target}>{plan === "expired" ? "Renew Subscription" : "Choose a Plan"}</Link>
        </Button>
      </div>
    </div>
  );
}
