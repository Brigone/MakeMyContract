import Link from "next/link";
import { requireAuthenticatedUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ExpiredPaywallPage() {
  await requireAuthenticatedUser();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center text-slate-700 sm:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-12 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-700">Plan expired</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">
          Your plan is paused. Renew to restart unlimited rental forms.
        </h1>
        <p className="mt-3 text-sm text-slate-800">
          Reactivate in seconds and pick up exactly where you left off—complete rental history, PDFs, and templates included.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/pricing">Renew subscription</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
