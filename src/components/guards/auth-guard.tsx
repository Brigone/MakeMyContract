import type { AuthenticatedUser } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthGuardProps {
  user: AuthenticatedUser | null;
  children: React.ReactNode;
}

export function AuthGuard({ user, children }: AuthGuardProps) {
  if (!user) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-lg">
        <h3 className="text-2xl font-semibold text-slate-900">Account Required</h3>
        <p className="mt-2 text-sm text-slate-800">
          Please create an account or log in with your paid subscription to continue.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
