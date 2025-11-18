import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 bg-white px-4 py-16 text-slate-700 sm:px-8 lg:flex-row">
      <div className="flex-1 rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl">
        <Badge>Account access</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Welcome back.</h1>
        <p className="mt-3 text-sm text-slate-900">
          Sign in to pick up where you left off, revisit your contract history, and download PDFs anytime. If you&apos;re
          new to Make My Contract, create your workspace first so these credentials exist.
        </p>
        <p className="mt-3 text-m text-blue-800">
          Still don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold underline-offset-4 hover:underline">
            Create an account
          </Link>{" "}
          before attempting to log in.
        </p>
      </div>
      <div className="flex-1 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
        <LoginForm />
        <p className="mt-4 text-center text-l text-slate-800">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-blue-600">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
