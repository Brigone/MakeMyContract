import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";

const navLinks = [
  { label: "How it works", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Legal assurance", href: "/pricing#compliance" },
];

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

export async function Navbar() {
  const user = await getCurrentUser();
  const isSubscribed = hasActivePlan(user?.plan ?? null);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-slate-700 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
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
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {isSubscribed ? (
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              )}
              <LogoutButton variant="secondary" size="sm" />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Start Now</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
