import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { PricingSection } from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DraftResumeWatcher } from "@/components/draft-resume-watcher";

export const metadata: Metadata = {
  title: "Make My Contract - simple plans for unlimited contracts",
  description:
    "Weekly, monthly, or annual access to unlimited contract generation. Finish checkout and jump right back into your draft.",
  keywords: ["contract pricing", "subscription contract generator", "nda subscription", "lease contract plan"],
  alternates: { canonical: "https://makemycontract.com/pricing" },
  openGraph: {
    title: "Make My Contract Pricing",
    description: "Pick a plan, pay once, and generate unlimited contracts with instant downloads.",
    url: "https://makemycontract.com/pricing",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

const benefitHighlights = [
  { title: "Fast checkout", detail: "Pay once and we route you back to the exact intake step you paused." },
  { title: "Instant downloads", detail: "No waiting for approvals or manual reviews. PDFs appear immediately." },
  { title: "Unlimited usage", detail: "Generate as many agreements as you need with zero per-document fees." },
];

const pricingFaq = [
  {
    question: "Which plan should I start with?",
    answer: "Weekly for sprint weeks, monthly for ongoing operations, annual for the best per-contract price.",
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes. Upgrade or downgrade anytime and every contract stays in your history.",
  },
  {
    question: "Do I need an account to pay?",
    answer: "Log in or sign up, pick a plan, finish Stripe checkout, and we resume your contract automatically.",
  },
];

export default async function PricingPage() {
  const user = await getCurrentUser();
  const isAuthenticated = Boolean(user);
  const canResumeDraft = Boolean(user && hasActivePlan(user.plan));
  const isSubscribed = hasActivePlan(user?.plan);

  const heroCta = isSubscribed
    ? { label: "Create Contract", href: "/contracts" }
    : { label: "Buy Now", href: "#plans" };

  const finalCta = isSubscribed
    ? { label: "Generate Contract", href: "/contracts" }
    : { label: "Buy Now", href: "#plans" };

  return (
    <main className="bg-white text-slate-900">
      <DraftResumeWatcher shouldResume={canResumeDraft} />
      <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-0">
        <header className="w-full rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-[0_30px_120px_rgba(15,23,42,0.08)] sm:p-10">
          <Badge className="mx-auto w-fit uppercase tracking-[0.3em]">Pricing</Badge>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            One click unlocks unlimited contracts.
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Choose your access window, finish checkout, and jump straight back into the contract you were building. No calls. No
            back-and-forth.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 w-full rounded-2xl py-5 text-base font-semibold sm:w-fit sm:px-10"
          >
            <Link href={heroCta.href}>{heroCta.label}</Link>
          </Button>
          <p className="mt-3 text-sm text-slate-500">Drafts stay saved until you generate the PDF.</p>
        </header>

        <section id="plans" className="mt-10 w-full">
          <PricingSection isAuthenticated={isAuthenticated} />
        </section>

        <section className="mt-10 w-full rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Immediate value</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {benefitHighlights.map((benefit) => (
              <article key={benefit.title} className="rounded-2xl border border-slate-100 bg-white p-4">
                <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{benefit.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 w-full rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Quick answers</h2>
          <dl className="mt-4 space-y-5">
            {pricingFaq.map((item) => (
              <div key={item.question}>
                <dt className="text-base font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-1 text-sm text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10 w-full rounded-[32px] border border-blue-200  p-6 text-white sm:p-10">
          <h2 className="text-3xl font-semibold">Ready to trigger the download?</h2>
          <p className="mt-3 text-base text-white/80">
            Tap {finalCta.label}. If you still need a plan, we guide you to the selector above and keep your spot in the builder.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 w-full rounded-2xl border border-white/40 hover:bg-white sm:w-fit sm:px-10"
          >
            <Link href={finalCta.href}>{finalCta.label}</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
