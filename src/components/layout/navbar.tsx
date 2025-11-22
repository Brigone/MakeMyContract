import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { SmartLink } from "@/components/link/smart-link";
import { RouteAwareButton } from "@/components/route-aware-button";

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

export async function Navbar() {
  const user = await getCurrentUser();
  const canUseAi = user ? hasActivePlan(user.plan) : false;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-slate-700 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <SmartLink className="text-lg font-semibold tracking-tight text-slate-900" />
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-500 md:flex">
            <Link href="/about" className="transition hover:text-slate-900">
              About
            </Link>
            <Link href="/pricing" className="transition hover:text-slate-900">
              Pricing
            </Link>
            {canUseAi && (
              <Link href="/ai-generator" className="transition hover:text-slate-900">
                AI Generator
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <RouteAwareButton
            href="/draft"
            className="rounded-full px-5"
            sameRouteMessage="You’re already inside the contract creator—scroll down to keep filling the steps."
            scrollTargetId="wizard-helper"
            conversionEvent="StartContract"
          >
            Start Contract
          </RouteAwareButton>
          {user ? (
            <>
              <Link href="/dashboard" className="hidden text-slate-500 transition hover:text-slate-900 sm:inline">
                Dashboard
              </Link>
              <LogoutButton variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900" />
            </>
          ) : (
            <Link href="/login" className="text-slate-500 transition hover:text-slate-900">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
