import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeaturesGrid } from "@/components/features-grid";
import { DashboardHighlight } from "@/components/dashboard-highlight";
import { PricingSection } from "@/components/pricing-section";
import { getCurrentUser } from "@/lib/auth";
import { CONTRACT_LIBRARY } from "@/lib/contracts-engine";

export const metadata: Metadata = {
  title: "Create Contracts in Minutes | Make My Contract",
  description:
    "Use our attorney-built templates to assemble leases, NDAs, notices, and more in under a minute. Guided intake, instant PDFs, and $1 welcome week.",
  keywords: [
    "create contract online",
    "legal contract generator",
    "online contract builder",
    "PDF contract creator",
    "lease agreement generator",
    "NDA generator",
    "independent contractor agreement template",
  ],
  alternates: {
    canonical: "https://makemycontract.com/",
  },
  openGraph: {
    title: "Create Legally-Safe Contracts Online | Make My Contract",
    description:
      "Guided intake, attorney-style templates, and signature-ready PDFs trusted by U.S. teams.",
    url: "https://makemycontract.com/",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const contractSpotlight = [
  {
    id: "contract-nda",
    title: "Mutual NDA Generator",
    summary:
      "Lock down confidential conversations for hiring, fundraising, and vendor onboarding with clauses that mirror U.S. counsel standards.",
    bullets: [
      "Plain-English summary plus attorney-style clauses",
      "Optional investor-specific confidentiality language",
      "Automatic governing-law clause for all 50 states",
    ],
  },
  {
    id: "contract-lease",
    title: "Residential Lease Agreement",
    summary:
      "Customize rent schedules, inspections, deposits, and move-out rules while keeping statutory language intact.",
    bullets: [
      "Fill in property details, rent escalations, and deposits",
      "Built-in warranty of habitability + maintenance duties",
      "Ready for tenants to sign digitally",
    ],
  },
  {
    id: "contract-contractor",
    title: "Independent Contractor Agreement",
    summary:
      "Protect IP, payment schedules, and non-solicitation promises for freelancers or agencies running U.S. projects.",
    bullets: [
      "Scope, deliverable, and milestone tracking",
      "Automatic confidentiality and indemnity toggles",
      "IRS 1099-compliant work-made-for-hire clause",
    ],
  },
  {
    id: "contract-safe",
    title: "Investor SAFE Template",
    summary:
      "Generate YC-style SAFEs with valuation caps, discount rates, and Delaware or California governing law.",
    bullets: [
      "Pre-seed and seed-ready format",
      "Cap tables stay clean with deterministic text",
      "Shareable PDF for signature stacks",
    ],
  },
];

const PUBLIC_CONTRACTS_PATH = "/contract-templates";

const MoreContractsLink = ({ className }: { className?: string }) => (
  <Link
    href={PUBLIC_CONTRACTS_PATH}
    aria-label="See more contract templates"
    className={`inline-flex items-center gap-1 text-sm font-semibold text-blue-700 underline-offset-4 hover:text-blue-600 hover:underline ${className ?? ""}`.trim()}
  >
    See more
    <span aria-hidden="true">→</span>
  </Link>
);

const totalContractTemplates = Object.keys(CONTRACT_LIBRARY).length;

const platformMetrics = [
  {
    value: "312,000+",
    label: "Contracts generated",
    detail: "Attorney-style NDAs, leases, offers, and loans issued in under a minute.",
  },
  {
    value: "58 sec",
    label: "Average build time",
    detail: "Guided intakes capture every fact once and export signature-ready PDFs.",
  },
  {
    value: "96%",
    label: "Subscriber renewal rate",
    detail: "Operators keep Make My Contract in their stack because it never slows a deal.",
  },
  {
    value: "$12.4M",
    label: "Revenue closed",
    detail: "Customers attribute closed-won revenue to automated contracts each quarter.",
  },
];

const targetAudience = [
  { label: "Founders", href: "/signup" },
  { label: "Landlords", href: "/signup" },
  { label: "Consultants", href: "/signup" },
  { label: "Service providers", href: "/signup" },
  { label: "Startup teams", href: "/signup" },
  { label: "HR + People", href: "/signup" },
];

const conversionHighlights = [
  {
    title: "Attorney-grade without waiting",
    detail:
      "Guided intake captures the facts once, then renders the same structure outside counsel would draft—ready for signatures in under a minute.",
  },
  {
    title: "Unlimited usage, predictable billing",
    detail: "Generate, revise, resend, and store every agreement with zero per-document upsells or retainer surprises.",
  },
  {
    title: "Instant trust for counterparties",
    detail:
      "Every PDF includes clear clause explanations, governing-law logic for all 50 states, and shareable history so decision makers sign faster.",
  },
];

const activationSteps = [
  {
    title: "Claim the $1 welcome access",
    detail: "Use coupon WELCOME on the Weekly plan to unlock a full week of unlimited contracts for one dollar.",
  },
  {
    title: "Answer the guided intake once",
    detail: "Enter parties, assets, payment terms, and optional protections. We apply the right attorney-reviewed clauses instantly.",
  },
  {
    title: "Download & reuse",
    detail:
      "Export signature-ready PDFs, duplicate prior contracts, and keep every version in a dashboard that your team can access anytime.",
  },
];

const reassurancePoints = [
  {
    title: "Security + audit readiness",
    detail: "Firebase Auth, encrypted history, and Stripe subscriptions keep sensitive deal data locked down.",
  },
  {
    title: "Zero-risk welcome week",
    detail: "Start for $1, unlock every feature, and cancel before the week ends if Make My Contract isn’t a fit.",
  },
  {
    title: "Human support on standby",
    detail: "Chat with our contract specialists for onboarding help, clause recommendations, or Stripe billing adjustments.",
  },
];

const testimonialQuotes = [
  {
    quote:
      "We replaced our patchwork of Google Docs with Make My Contract and now issue NDAs and contractor agreements in minutes, not days.",
    author: "Maya Thompson",
    role: "Fractional COO, RevOps Collective",
  },
  {
    quote: "The $1 welcome week paid for itself by day two—we closed a tenant with a compliant lease before the competitor even replied.",
    author: "Eric Lopez",
    role: "Principal, Sunbelt Property Group",
  },
];

const comparisonGrid = [
  {
    label: "Average cost per agreement",
    makeMyContract: "$0 after subscription",
    lawFirm: "$450+ per document",
    template: "Hidden upsells",
  },
  {
    label: "Time to generate",
    makeMyContract: "30–60 seconds",
    lawFirm: "2–5 business days",
    template: "30 minutes + manual edits",
  },
  {
    label: "PDF + signature-ready formatting",
    makeMyContract: "Included and automatic",
    lawFirm: "Extra billing",
    template: "Requires copy/paste",
  },
  {
    label: "Storage & history",
    makeMyContract: "Unlimited dashboard history",
    lawFirm: "Email attachments only",
    template: "No archival",
  },
];

const faqItems = [
  {
    question: "How fast can I create a legally safe contract online?",
    answer:
      "Most Make My Contract users finish a guided intake in under one minute and download a PDF instantly. The builder uses deterministic attorney-style clauses, so there is zero waiting for a lawyer or AI hallucinations.",
  },
  {
    question: "Are the contracts enforceable in every U.S. state?",
    answer:
      "Yes. Each template contains jurisdiction-aware governing-law and venue language, plus the option to specify state-specific disclosures. Simply choose the state during intake and Make My Contract formats the clause automatically.",
  },
  {
    question: "How does Make My Contract compare to LegalZoom, RocketLawyer, or PandaDoc?",
    answer:
      "Competitors rely on generic templates or upsell attorney reviews. Make My Contract focuses on premium SaaS speed, deterministic copy, and unlimited usage. You generate polished PDFs faster than RocketLawyer, without PandaDoc document limits, and without LegalZoom upsells.",
  },
  {
    question: "Can I edit clauses before downloading the PDF?",
    answer:
      "Absolutely. Each intake step supports optional notes, custom clauses, and toggles for confidentiality, IP ownership, indemnification, non-solicitation, and arbitration. The PDF reflects every choice.",
  },
  {
    question: "Does Make My Contract store my agreements?",
    answer:
      "Every contract is saved to your encrypted dashboard. You can resend, regenerate with new facts, or download the PDF anytime. Paid accounts keep unlimited history tied to your subscription.",
  },
  {
    question: "Is Make My Contract a law firm?",
    answer:
      "No. We provide deterministic legal-grade templates powered by attorney guidance, but we are not a law firm and cannot offer personalized legal advice. You may export any PDF for review by counsel.",
  },
  {
    question: "Which industries use Make My Contract?",
    answer:
      "Founders, real estate investors, HR leaders, consultants, and creative agencies rely on Make My Contract to replace ad-hoc legal tasks. Any U.S. business that needs predictable, professional agreements benefits from the platform.",
  },
  {
    question: "How much does the contract generator cost?",
    answer:
      "Choose Unlimited Weekly ($9), Unlimited Monthly ($19), or Unlimited Annual ($99). Use coupon WELCOME to make your first Weekly plan just $1, then continue with whichever cadence matches your pipeline. Every option unlocks unlimited agreements, dashboard history, and PDF downloads.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();
  const isAuthenticated = Boolean(user);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-slate-50 px-4 pb-20 pt-8 text-slate-800">
      <article className="mx-auto max-w-6xl space-y-16">
        <header id="hero" className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-2xl">
          <Badge className="w-fit bg-blue-600/10 text-blue-800">Attorney-grade in 60 seconds</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Use ready-made templates to create airtight contracts in minutes.
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Make My Contract gives founders, landlords, and operators guided intake plus attorney-written templates so
            NDAs, leases, offers, and notices are ready to sign before the momentum fades.
          </p>
         <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-blue-700">
            {targetAudience.map((persona) => (
              <li
                key={persona.label}
                className="rounded-full border border-blue-200 px-3 py-1 text-blue-800"
              >
                <Link href={persona.href} className="transition hover:text-blue-900">
                  {persona.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" aria-label="Start drafting contracts for $1">
              <Link href="/signup">Start for $1</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              aria-label={isAuthenticated ? "Open dashboard" : "See contract templates"}
            >
              <Link href={isAuthenticated ? "/dashboard" : PUBLIC_CONTRACTS_PATH}>
                {isAuthenticated ? "Open dashboard" : "Browse templates"}
              </Link>
            </Button>
          </div>
          <p className="mt-3 text-sm text-blue-900">
            Limited Welcome Offer: Use coupon <span className="font-semibold">WELCOME</span> on the Weekly plan to unlock
            every feature for $1 during your first 7 days. Experience the full platform, cancel anytime, and keep every
            contract you generate.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {platformMetrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                <p className="text-sm font-semibold text-slate-600">{metric.label}</p>
                <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Trusted by operators who need legal-grade paperwork without slowing down acquisitions, tenant onboarding, or
            client work.
          </p>
        </header>

        <section
          aria-labelledby="conversion-highlights"
          className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="conversion-highlights" className="text-3xl font-semibold text-slate-900">
              Why high-value operators upgrade on their first visit
            </h2>
            <MoreContractsLink />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {conversionHighlights.map((highlight) => (
              <article key={highlight.title} className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">{highlight.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{highlight.detail}</p>
              </article>
            ))}
          </div>
        </section>
        {/* <section
          aria-labelledby="proof"
          className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="proof" className="text-3xl font-semibold text-slate-900">
                Proof that Make My Contract keeps revenue moving
              </h2>
              <p className="mt-2 text-slate-700">
                Subscriber metrics and renewals show exactly how much friction disappears once paperwork is automated.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/signup">Join the next cohort</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <ul className="space-y-4">
              {platformMetrics.map((metric) => (
                <li key={metric.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">{metric.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{metric.detail}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-6">
              {testimonialQuotes.map((testimonial) => (
                <figure key={testimonial.author} className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <blockquote className="text-base text-slate-900">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-blue-900">
                    {testimonial.author} <span className="font-normal text-slate-600">— {testimonial.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section> */}

        <section
          aria-labelledby="how-it-works"
          className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="how-it-works" className="text-3xl font-semibold text-slate-900">
                From idea to signed contract in three steps
              </h2>
              <p className="mt-2 text-slate-700">
                Each intake is deterministic, so you can trust the PDF without looping in counsel every time.
              </p>
            </div>
            <Button asChild>
              <Link href="/signup">Create Now</Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {activationSteps.map((step, index) => (
              <article key={step.title} className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <span className="text-4xl font-semibold text-blue-200">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-700">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="features" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="features" className="text-3xl font-semibold text-slate-900">
              Everything you need to remove contract friction
            </h2>
            <MoreContractsLink />
          </div>
          <p className="mt-2 text-slate-700">
            Clause controls, compliance-ready exports, and real-time storage are included in every plan so nothing stands
            between you and a signed deal.
          </p>
          <FeaturesGrid />
        </section>

        <section aria-labelledby="dashboard" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="dashboard" className="text-3xl font-semibold text-slate-900">
                Monitor every agreement from a single source of truth
              </h2>
              <p className="mt-2 text-slate-700">
                Smart filters, resend links, and PDF history keep finance, legal, and operations fully aligned.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/signup">Unlock the dashboard</Link>
            </Button>
          </div>
          <DashboardHighlight />
        </section>

        <section id="contract-library" aria-labelledby="template-gallery" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="template-gallery" className="text-3xl font-semibold text-slate-900">
                Template library built for urgent U.S. deals
              </h2>
              <p className="text-slate-700">
                Launch instantly with attorney-structured NDAs, leases, contractor agreements, SAFEs, employment offers,
                policies, and more. Every plan unlocks {totalContractTemplates}+ templates plus unlimited revisions.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Looking for another agreement?{" "}
                <Link
                  href={PUBLIC_CONTRACTS_PATH}
                  className="font-semibold text-blue-700 underline-offset-4 hover:text-blue-600 hover:underline"
                >
                  Open the full directory
                </Link>{" "}
                to see every contract that’s included.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/signup">Claim the $1 welcome week</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {contractSpotlight.map((contract) => (
              <article
                key={contract.id}
                id={contract.id}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">Template highlight</p>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">{contract.title}</h3>
                <p className="text-sm text-slate-700">{contract.summary}</p>
                <ul className="space-y-2 text-sm text-slate-800">
                  {contract.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild aria-label={`View pricing to unlock the ${contract.title}`}>
                  <Link href="/signup">Unlock this template</Link>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="reassurance" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="reassurance" className="text-3xl font-semibold text-slate-900">
            Confidence boosters baked into every subscription
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {reassurancePoints.map((point) => (
              <article key={point.title} className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{point.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="comparison" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="comparison" className="text-3xl font-semibold text-slate-900">
            The fastest ROI compared to law firms or template shops
          </h2>
          <p className="mt-2 text-slate-700">
            Share this table with investors, CFOs, or compliance teams when they ask why Make My Contract wins.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse rounded-3xl border border-slate-200 text-left text-sm">
              <thead>
                <tr className="bg-blue-50 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  <th scope="col" className="px-4 py-3 text-blue-900 sm:px-6">
                    Criteria
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Make My Contract
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Traditional law firm
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Template marketplaces
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonGrid.map((row) => (
                  <tr key={row.label} className="border-t border-slate-200 text-slate-700">
                    <th scope="row" className="px-4 py-4 font-medium text-slate-900 sm:px-6">
                      {row.label}
                    </th>
                    <td className="px-4 py-4 text-slate-800 sm:px-6">{row.makeMyContract}</td>
                    <td className="px-4 py-4 text-slate-600 sm:px-6">{row.lawFirm}</td>
                    <td className="px-4 py-4 text-slate-600 sm:px-6">{row.template}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/signup">Secure unlimited access</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/pricing">Share with stakeholders</Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="pricing" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="pricing" className="text-3xl font-semibold text-slate-900">
            Upgrade in minutes, keep every contract forever
          </h2>
          <p className="mt-2 text-slate-700">
            Weekly, monthly, and annual plans include unlimited documents, dashboard history, and PDF exports. Use coupon
            WELCOME to test the Weekly plan for $1, then scale to the cadence that matches your pipeline.
          </p>
          <PricingSection isAuthenticated={isAuthenticated} />
        </section>

        <section id="faq" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl" aria-labelledby="faq-heading">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="faq-heading" className="text-3xl font-semibold text-slate-900">
              FAQ: everything decision makers ask before subscribing
            </h2>
            <MoreContractsLink />
          </div>
          <p className="mt-2 text-slate-700">
            Share these answers with co-founders, CFOs, and attorneys to keep the approval loop tight.
          </p>
          <dl className="mt-8 space-y-6">
            {faqItems.map((item) => (
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
      </article>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
