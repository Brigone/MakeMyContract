import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { PricingSection } from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import { PLAN_CONFIG } from "@/lib/plans";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Make My Contract Pricing | Unlimited Online Contract Generator Plans",
  description:
    "Choose Unlimited Weekly, Unlimited Monthly, or Unlimited Annual access to create contracts online, download PDFs, and track history with Make My Contract.",
  keywords: [
    "contract generator pricing",
    "online contract builder cost",
    "legal contract subscription",
    "Make My Contract plans",
  ],
  alternates: {
    canonical: "https://makemycontract.example.com/pricing",
  },
  openGraph: {
    title: "Transparent pricing for online contract generation",
    description:
      "Make My Contract offers predictable weekly, monthly, and annual plans for unlimited attorney-style contracts.",
    url: "https://makemycontract.example.com/pricing",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const benefitHighlights = [
  {
    title: "Unlimited attorney-style agreements",
    detail:
      "Generate residential leases, NDAs, contractor agreements, SAFEs, and more without per-document billing.",
  },
  {
    title: "Audit-ready history & PDF exports",
    detail: "Every agreement stays organized in your dashboard with instant download links and resend options.",
  },
  {
    title: "Security & compliance baked in",
    detail:
      "Server-side rendering, Firebase Auth, and Stripe subscriptions keep client data private and auditable.",
  },
];

const pricingFaq = [
  {
    question: "Which plan should I start with?",
    answer:
      "Choose Unlimited Weekly for busy deal cycles, Unlimited Monthly for ongoing operations, or Unlimited Annual for the best per-document value. Each plan unlocks identical features.",
  },
  {
    question: "Do you charge per contract or per PDF?",
    answer:
      "No. Every subscription tier includes unlimited generations, revisions, and downloads. Pricing stays predictable even during busy weeks.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. Use your dashboard to upgrade or downgrade after any billing period. Stripe proration applies automatically.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Make My Contract is a paid-only SaaS. Requiring an active subscription keeps legal content behind a secure paywall and protects customer data.",
  },
];

export default async function PricingPage() {
  const user = await getCurrentUser();
  const isAuthenticated = Boolean(user);
  const activePlan = user?.plan ?? null;
  const readablePlan = activePlan ? activePlan.replace(/^[a-z]/, (char) => char.toUpperCase()) : null;

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Make My Contract Pricing",
    itemListElement: PLAN_CONFIG.map((plan) => ({
      "@type": "Offer",
      name: plan.label,
      price: plan.price.replace("$", ""),
      priceCurrency: "USD",
      url: "https://makemycontract.example.com/pricing",
      description: plan.description,
      availability: "https://schema.org/InStock",
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="bg-slate-50 px-4 pb-20 pt-8 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-16 lg:space-y-20">
        <header className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-2xl">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-blue-700">
            <ol className="flex flex-wrap justify-center gap-2">
              <li>
                <Link href="/#hero" className="hover:text-blue-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/pricing" aria-current="page" className="font-semibold text-slate-900">
                  Pricing
                </Link>
              </li>
            </ol>
          </nav>
          <Badge className="mx-auto mt-4 w-fit">Transparent legal pricing</Badge>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            Pick the plan that keeps every contract compliant and on time.
          </h1>
          <p className="mt-4 text-base">
            No retainers. No per-document surprises. Just unlimited access to the fastest online contract generator
            available for U.S. companies.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/signup">Start your subscription</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/#contract-library">Browse contract templates</Link>
            </Button>
          </div>
        </header>

        <section aria-labelledby="pricing-table" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="pricing-table" className="text-3xl font-semibold text-slate-900">
            Weekly, monthly, and annual plans for serious operators
          </h2>
          <p className="mt-2 text-slate-700">
            Every tier unlocks the same contract generator, PDF rendering, and dashboard storage. Choose the billing
            cadence that matches your deal flow, then upgrade or downgrade whenever you need.
          </p>
          <PricingSection isAuthenticated={isAuthenticated} />
        </section>

        <section aria-labelledby="benefits" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="benefits" className="text-3xl font-semibold text-slate-900">
            Why subscribers trust Make My Contract over hourly legal fees
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {benefitHighlights.map((benefit) => (
              <article key={benefit.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{benefit.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing-faq" aria-labelledby="pricing-faq-heading" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="pricing-faq-heading" className="text-3xl font-semibold text-slate-900">
            Pricing FAQ
          </h2>
          <dl className="mt-6 space-y-6">
            {pricingFaq.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 text-slate-700">{item.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/signup">Create your account</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/login">Already subscribed? Sign in</Link>
            </Button>
          </div>
        </section>

        <section id="compliance" className="rounded-[32px] border border-slate-200 bg-white p-8  mt-10 shadow-xl">
          <h2 className="text-2xl font-semibold text-slate-900">Compliance commitments</h2>
          <p className="mt-2 text-sm text-slate-700">
            Make My Contract isn’t a law firm, but every template mirrors U.S. attorney structure. Your data stays in
            Firebase + Stripe, and every contract is ready for outside counsel review.
          </p>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-8  mt-10 shadow-xl">
          {user ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Your subscription</h2>
              <p className="mt-2 text-sm text-slate-700">
                {activePlan
                  ? `You are on the ${readablePlan} plan as ${user.email}.`
                  : `Your trial has expired. Choose a plan to regain access.`}
              </p>
              {activePlan && (
                <>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    Active plan: {activePlan}
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <Button asChild>
                      <Link href="/dashboard">Go to dashboard</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="https://billing.stripe.com/p/login/test-dashboard" target="_blank">
                        Cancel subscription
                      </Link>
                    </Button>
                  </div>
                </>
              )}
              {!activePlan && (
                <div className="mt-4 flex justify-center gap-3">
                  <Button asChild>
                    <Link href="/pricing">View plans</Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Manage your plan</h2>
              <p className="mt-2 text-sm text-slate-700">
                Sign in to view billing details, cancel your subscription, or update payment methods.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/signup">Create account</Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
      {[offerSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </main>
  );
}
