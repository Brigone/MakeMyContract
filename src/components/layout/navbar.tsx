import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

export async function Navbar() {
  const user = await getCurrentUser();
  const isSubscribed = hasActivePlan(user?.plan);

  const primaryCta = isSubscribed
    ? { label: "Create Contract", href: "/contracts" }
    : user
      ? { label: "Buy Now", href: "/pricing" }
      : { label: "Create Contract", href: "/contracts" };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-center text-lg font-semibold tracking-tight text-slate-900 sm:text-left"
        >
          Make My Contract
        </Link>
        <div className="flex w-full flex-col gap-2 text-sm font-medium sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="text-center text-slate-500 transition hover:text-slate-900 sm:text-left">
                Dashboard
              </Link>
              <Button asChild size="lg" className="w-full justify-center sm:w-auto">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <LogoutButton
                variant="ghost"
                size="lg"
                className="w-full justify-center text-slate-500 hover:text-slate-900 sm:w-auto"
              />
            </>
          ) : (
            <>
              <Link href="/login" className="text-center text-slate-500 transition hover:text-slate-900 sm:text-left">
                Login
              </Link>
              <Button asChild size="lg" className="w-full justify-center sm:w-auto">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
