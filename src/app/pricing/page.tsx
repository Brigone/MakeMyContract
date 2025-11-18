import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { PricingSection } from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import { PLAN_CONFIG } from "@/lib/plans";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Make My Contract Pricing - Unlimited Rental Paperwork Plans",
  description:
    "See simple weekly, monthly, and annual pricing for Make My Contract. Every plan unlocks unlimited templates, PDFs, and dashboard history.",
  keywords: [
    "contract generator pricing",
    "online contract builder cost",
    "legal contract subscription",
    "Make My Contract pricing",
  ],
  alternates: {
    canonical: "https://makemycontract.com/pricing",
  },
  openGraph: {
    title: "Simple pricing for online contract generation",
    description:
      "Predictable weekly, monthly, and annual subscriptions for unlimited attorney-style contracts.",
    url: "https://makemycontract.com/pricing",
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

const planScenarios = [
  {
    label: "Weekly access",
    highlight: "$1 welcome week",
    detail: "Perfect for testing the platform, onboarding a burst of tenants, or handling a fast due-diligence sprint.",
  },
  {
    label: "Monthly access",
    highlight: "Most popular",
    detail: "Ideal for active landlords and operators who create rental paperwork every month and want predictable billing.",
  },
  {
    label: "Annual access",
    highlight: "Best long-term value",
    detail: "Lock in the lowest price when your team lives in contracts year-round and needs unlimited seats ready to go.",
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
      url: "https://makemycontract.com/pricing",
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
          <Badge className="mx-auto mt-4 w-fit">Pricing & plans</Badge>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            Simple pricing for unlimited rental paperwork.
          </h1>
          <p className="mt-4 text-base text-slate-700">
            Pick the subscription that matches your workload—weekly for $1, predictable monthly access, or the best-value
            annual pass. Every option unlocks identical features, unlimited templates, and dashboard history.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/signup">Create your account</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/#contract-library">Browse contract templates</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-800">
            Premium Welcome Offer: Enter coupon <span className="font-semibold text-blue-900">WELCOME</span> at
            checkout on the Unlimited Weekly plan to lock in a $1 first week—full feature access, minimal risk, and a
            limited invitation to experience Make My Contract before paying standard rates.
          </p>
        </header>
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl mt-10">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">Which option is right for you?</h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Use these quick cues to decide where to start. You can upgrade, downgrade, or switch cadences anytime.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {planScenarios.map((scenario) => (
              <article key={scenario.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">{scenario.highlight}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{scenario.label}</h3>
                <p className="mt-2 text-sm text-slate-700">{scenario.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="pricing-table" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="pricing-table" className="text-3xl font-semibold text-slate-900">
            Choose the subscription that fits your workflow
          </h2>
          <p className="mt-2 text-slate-700">
            Every tier unlocks the same contract generator, PDF rendering, and dashboard storage. Pick the cadence that
            matches your deal flow, then switch anytime from your dashboard.
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
                    <Link href="#pricing-table">See pricing options</Link>
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
