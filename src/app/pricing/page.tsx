import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { PricingSection } from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import { PLAN_CONFIG } from "@/lib/plans";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Make My Rental Pricing | Unlimited Rental Paperwork Plans",
  description:
    "Choose Unlimited Weekly, Unlimited Monthly, or Unlimited Annual access to create rental agreements online, download PDFs, and track history with Make My Rental.",
  keywords: [
    "rental agreement pricing",
    "landlord form subscription",
    "rental paperwork software",
    "Make My Rental plans",
  ],
  alternates: {
    canonical: "https://makemyrental.com/pricing",
  },
  openGraph: {
    title: "Transparent pricing for online rental paperwork",
    description:
      "Make My Rental offers predictable weekly, monthly, and annual plans for unlimited landlord forms.",
    url: "https://makemyrental.com/pricing",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const benefitHighlights = [
  {
    title: "Unlimited landlord paperwork",
    detail:
      "Generate residential leases, addendums, notices, and checklists without per-document billing.",
  },
  {
    title: "Audit-ready history & PDF exports",
    detail: "Every rental form stays organized in your dashboard with instant download links and resend options.",
  },
  {
    title: "Security & compliance baked in",
    detail:
      "Server-side rendering, Firebase Auth, and Stripe subscriptions keep tenant data private and auditable.",
  },
];

const pricingFaq = [
  {
    question: "Which plan should I start with?",
    answer:
      "Choose Unlimited Weekly for busy turnover cycles, Unlimited Monthly for ongoing leasing, or Unlimited Annual for the best per-form value. Each plan unlocks identical features.",
  },
  {
    question: "Do you charge per rental form or per PDF?",
    answer:
      "No. Every subscription tier includes unlimited generations, revisions, and downloads. Pricing stays predictable even during busy leasing weeks.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. Use your dashboard to upgrade or downgrade after any billing period. Stripe proration applies automatically.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Make My Rental is a paid-only SaaS. Requiring an active subscription keeps legal content behind a secure paywall and protects tenant data.",
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
    name: "Make My Rental Pricing",
    itemListElement: PLAN_CONFIG.map((plan) => ({
      "@type": "Offer",
      name: plan.label,
      price: plan.price.replace("$", ""),
      priceCurrency: "USD",
      url: "https://makemyrental.com/pricing",
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
          <Badge className="mx-auto mt-4 w-fit">Transparent landlord pricing</Badge>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            Pick the plan that keeps every rental form compliant and on time.
          </h1>
          <p className="mt-4 text-base">
            No retainers. No per-document surprises. Just unlimited access to the fastest online rental paperwork
            generator available for U.S. landlords.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/signup">Start Now</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/#contract-library">Browse rental templates</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-800">
            Premium Welcome Offer: Enter coupon <span className="font-semibold text-blue-900">WELCOME</span> at
            checkout on the Unlimited Weekly plan to lock in a $1 first week—full feature access, minimal risk, and a
            limited invitation to experience Make My Rental before paying standard rates.
          </p>
        </header>

        <section aria-labelledby="pricing-table" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="pricing-table" className="text-3xl font-semibold text-slate-900">
            Weekly, monthly, and annual plans for serious landlords
          </h2>
          <p className="mt-2 text-slate-700">
            Every tier unlocks the same rental form generator, PDF rendering, and dashboard storage. Choose the billing
            cadence that matches your vacancy flow, then upgrade or downgrade whenever you need.
          </p>
          <PricingSection isAuthenticated={isAuthenticated} />
        </section>

        <section aria-labelledby="benefits" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="benefits" className="text-3xl font-semibold text-slate-900">
            Why subscribers trust Make My Rental over hourly legal fees
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
            Make My Rental isn’t a law firm, but every rental template mirrors U.S. attorney structure. Your data stays in
            Firebase + Stripe, and every lease or notice is ready for outside counsel review.
          </p>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-8  mt-10 shadow-xl">
          {user ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Your subscription</h2>
              <p className="mt-2 text-sm text-slate-700">
                {activePlan
                  ? `You are on the ${readablePlan} plan as ${user.email}.`
                  : `Your trial has expired. Choose a plan to regain access to rental forms.`}
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
