import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

export async function SmartCtaBar() {
  const user = await getCurrentUser();
  const isSubscribed = hasActivePlan(user?.plan);

  const cta = isSubscribed
    ? { label: "Generate Contract", href: "/" }
    : { label: "Create Contract", href: "/" };

  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-1 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-base font-semibold text-slate-900">Need a contract right now?</p>
          <p className="text-sm text-slate-600">Tap below to {cta.label === "Buy Now" ? "unlock instant PDFs" : "open the editor"}.</p>
        </div>
        <Button
          asChild
          size="lg"
          className="w-full rounded-2xl text-base font-semibold sm:w-auto sm:self-end sm:px-10"
        >
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </div>
  );
}
