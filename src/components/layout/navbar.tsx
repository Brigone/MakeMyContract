import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contracts", href: "/contracts" },
  { label: "Start Now", href: "/dashboard" },
];

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

export async function Navbar() {
  const user = await getCurrentUser();
  const isSubscribed = hasActivePlan(user?.plan ?? null);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2.5 text-slate-700 max-[430px]:max-w-sm max-[430px]:px-2 max-[430px]:py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-6 max-[430px]:gap-2">
          <Link
            href="/"
            className="text-[0.95rem] font-semibold tracking-tight text-slate-900 max-[430px]:text-[0.85rem] sm:text-lg"
          >
            Make My Contract
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2 text-xs font-semibold sm:gap-3 sm:text-sm max-[430px]:gap-1.5 max-[430px]:text-[0.65rem]">
          {user ? (
            <>
              <Link href="/dashboard" className="text-slate-600 transition hover:text-slate-900">
                Dashboard
              </Link>
              {!isSubscribed && (
                <Button
                  asChild
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs font-semibold sm:text-sm max-[430px]:h-7 max-[430px]:px-2.5"
                >
                  <Link href="/dashboard">Start Now</Link>
                </Button>
              )}
              <LogoutButton
                variant="secondary"
                size="sm"
                className="h-8 px-3 text-xs sm:text-sm max-[430px]:h-7 max-[430px]:px-2.5"
              />
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-600 transition hover:text-slate-900">
                Login
              </Link>
              <Button
                asChild
                size="sm"
                className="h-8 rounded-full px-3 text-xs font-semibold sm:text-sm max-[430px]:h-7 max-[430px]:px-2.5"
              >
                <Link href="/dashboard">Start Now</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
