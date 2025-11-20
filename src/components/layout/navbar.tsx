import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { SmartLink } from "@/components/link/smart-link";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 text-slate-700 sm:px-6 lg:px-8">
        <SmartLink className="text-lg font-semibold tracking-tight text-slate-900" />
        <div className="flex items-center gap-3 text-sm font-medium">
          {user ? (
            <>
              <Link href="/dashboard" className="text-slate-500 transition hover:text-slate-900">
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
