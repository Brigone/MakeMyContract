import Link from "next/link";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 text-slate-700 sm:px-8 lg:flex-row">
      <div className="flex-1 rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl">
        <Badge>Get started</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Create your workspace.</h1>
        <p className="mt-3 text-sm text-slate-900">
          Create your workspace, personalize your templates, and start generating attorney-grade rental forms today.
        </p>
      </div>
      <div className="flex-1 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
        <SignupForm />
        <p className="mt-4 text-center text-sm text-slate-800">
          Already using Make My Rental?{" "}
          <Link href="/login" className="font-semibold text-blue-600">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
