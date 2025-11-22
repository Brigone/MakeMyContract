import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { RouteAwareLink } from "@/components/route-aware-link";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 bg-white px-4 py-12 text-slate-700 sm:gap-8 sm:px-6 lg:flex-row">
      <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:rounded-[32px] sm:p-10">
        <Badge className="inline-flex px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
          Account access
        </Badge>
        <h1 className="mt-3 text-2xl font-semibold leading-tight text-slate-900 sm:text-4xl">Welcome back.</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-900">
          Sign in to pick up where you left off, revisit your contract history, and download PDFs anytime. If you&apos;re
          new to Make My Contract, create your workspace first so these credentials exist.
        </p>
        <p className="mt-3 text-sm text-blue-800">
          Still don&apos;t have an account?{" "}
          <RouteAwareLink
            href="/signup"
            className="font-semibold text-blue-700 underline-offset-4 hover:underline"
            sameRouteMessage="You’re already on the signup page."
          >
            Create an account
          </RouteAwareLink>{" "}
          before attempting to log in.
        </p>
      </div>
      <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:rounded-[32px] sm:p-8">
        <LoginForm />
        <p className="mt-4 text-center text-sm text-slate-800">
          New here?{" "}
          <RouteAwareLink
            href="/signup"
            className="font-semibold text-blue-600"
            sameRouteMessage="You’re already viewing the signup form."
          >
            Create an account
          </RouteAwareLink>
        </p>
      </div>
    </div>
  );
}
