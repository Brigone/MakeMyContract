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
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-3 py-12 text-slate-700 max-[430px]:max-w-sm max-[430px]:gap-5 max-[430px]:px-2 max-[430px]:py-10 sm:gap-8 sm:px-6 lg:flex-row">
      <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl max-[430px]:p-4 sm:rounded-[32px] sm:p-10">
        <Badge className="inline-flex px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
          Get started
        </Badge>
        <h1 className="mt-3 text-2xl font-semibold leading-tight text-slate-900 sm:text-4xl">Create your account to make a contract.</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-900">
          Create your Make My Contract account, tailor the templates to your properties, and start issuing compliant rental
          agreements in minutes.
        </p>
      </div>
      <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl max-[430px]:p-4 sm:rounded-[32px] sm:p-8">
        <SignupForm />
        <p className="mt-4 text-center text-sm text-slate-800">
          Already using Make My Contract?{" "}
          <Link href="/login" className="font-semibold text-blue-600">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
