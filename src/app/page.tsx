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
  title: "Make My Contract – Create Contracts in Minutes",
  description:
    "Use our attorney-built templates to assemble leases, NDAs, notices, and business agreements in under a minute. Guided intake, instant PDFs, and unlimited history.",
  keywords: [
    "contract templates",
    "create contract online",
    "lease builder",
    "NDA generator",
    "rental agreement software",
    "business contract generator",
  ],
  alternates: { canonical: "https://makemycontract.com/" },
  openGraph: {
    title: "Make My Contract – Create contracts in 60 seconds",
    description: "Attorney-grade templates, guided intake, and instant PDFs for teams that need paperwork now.",
    url: "https://makemycontract.com/",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const HERO_STATS = [
  { value: "312,000+", label: "Contracts generated" },
  { value: "58 sec", label: "Avg. build time" },
  { value: "96%", label: "Renewal rate" },
];

const targetAudience = [
  { label: "Founders", href: "/contracts" },
  { label: "Landlords", href: "/contracts" },
  { label: "Consultants", href: "/contracts" },
  { label: "Service teams", href: "/contracts" },
  { label: "HR & People", href: "/contracts" },
  { label: "Startup ops", href: "/contracts" },
];

const VALUE_PILLARS = [
  {
    title: "State-specific, zero guesswork",
    detail:
      "Pick the state, toggle disclosures, and drop compliant clauses for leases, NDAs, subleases, and notices without manual research.",
  },
  {
    title: "Unlimited documents & history",
    detail:
      "Duplicate prior agreements, reuse facts, and keep every PDF synced to your dashboard with no per-document upsells.",
  },
  {
    title: "Upgrade only when you’re ready",
    detail:
      "Edit every template publicly, then subscribe to unlock PDF generation, history, and unlimited usage for $1 to start.",
  },
];

const OBJECTION_HANDLERS = [
  {
    question: "Is this enforceable in my state?",
    answer:
      "Yes. Templates include jurisdiction-aware governing law, move-in disclosures, and optional clauses for all 50 states.",
  },
  {
    question: "What happens when I upgrade?",
    answer:
      "Your draft continues exactly where you left off and every PDF, history entry, and template stays unlocked as long as you subscribe.",
  },
  {
    question: "Do I need an attorney after this?",
    answer:
      "Most customers run everything inside Make My Contract. Export any PDF if counsel wants to review and track edits inline.",
  },
  {
    question: "Can I edit clauses before downloading?",
    answer:
      "Every section includes plain-English summaries plus editable legal clauses, optional addendums, and custom notes before download.",
  },
  {
    question: "Does it work for short-term rentals and business deals?",
    answer:
      "Yes. Airbnb stays, room rentals, service agreements, NDAs, employment offers, and more live in the same library.",
  },
];

const CTA = {
  start: { label: "Start free", href: "/signup" },
  dashboard: { label: "Go to dashboard", href: "/dashboard" },
  builder: { label: "Create my contract", href: "/contracts" },
  upgrade: { label: "Start monthly access", href: "/pricing" },
};

const ExploreLink = ({ className }: { className?: string }) => (
  <Link
    href={CTA.builder.href}
    className={`inline-flex items-center gap-1 text-sm font-semibold text-blue-700 underline-offset-4 hover:text-blue-600 hover:underline ${className ?? ""}`.trim()}
  >
    {CTA.builder.label} <span aria-hidden="true">→</span>
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

const targetFeaturesHeading = "Why high-value operators upgrade after trying the editor";

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
    title: "Open the editor",
    detail: "Load any template publicly, edit clauses, and preview PDFs before you ever create an account.",
  },
  {
    title: "Answer the guided intake",
    detail: "Enter parties, assets, payment terms, and protections. We apply the right attorney-reviewed clauses instantly.",
  },
  {
    title: "Upgrade when you’re ready",
    detail:
      "Click Upgrade Now when you’re ready to generate. We’ll save your draft, route you through signup, then restore your work automatically.",
  },
];

const reassurancePoints = [
  {
    title: "Security + audit readiness",
    detail: "Secure authentication, encrypted history, and trusted billing keep sensitive deal data locked down.",
  },
  {
    title: "Drafts preserved across devices",
    detail: "We store in-progress contracts locally and restore them after signup so you never lose work.",
  },
  {
    title: "Human support on standby",
    detail: "Chat with our specialists for onboarding help, clause recommendations, or billing questions.",
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
    quote:
      "We issued a compliant short-term rental agreement before the competitor replied. The editor sealed the deal in under an hour.",
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
      "Every contract is saved to your encrypted dashboard once you’re subscribed. You can resend, regenerate with new facts, or download the PDF anytime.",
  },
  {
    question: "Is Make My Contract a law firm?",
    answer:
      "No. We provide deterministic legal-grade templates powered by attorney guidance, but we are not a law firm and cannot offer personalized legal advice. You may export any PDF for review by counsel.",
  },
  {
    question: "Which industries use Make My Contract?",
    answer:
      "Founders, real estate investors, HR leaders, consultants, and creative agencies rely on Make My Contract to replace ad-hoc legal tasks.",
  },
  {
    question: "How much does the contract generator cost?",
    answer:
      "Choose Unlimited Weekly ($9), Unlimited Monthly ($19), or Unlimited Annual ($99). Every option unlocks unlimited agreements, dashboard history, and PDF downloads once you subscribe.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();

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
        <header
          id="hero"
          className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-2xl md:p-12"
        >
          <div className="flex flex-col gap-4 text-center md:text-left">
            <Badge className="mx-auto w-fit bg-blue-600/10 text-blue-800 md:mx-0">Contracts ready in 60 seconds</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Create a signature-ready contract in minutes before the deal goes cold.
            </h1>
            <p className="text-lg text-slate-700 md:max-w-3xl">
              Answer plain-language prompts, see every clause update in real time, and tap once to download a PDF. We auto-save
              each draft locally so you can sign up later without losing a single field.
            </p>
            <ul className="flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 md:justify-start">
              {targetAudience.map((persona) => (
                <li key={persona.label} className="rounded-full border border-blue-200 px-3 py-1 text-blue-800">
                  <Link href={persona.href} className="transition hover:text-blue-900">
                    {persona.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              <Button asChild size="lg">
                <Link href={CTA.start.href}>{CTA.start.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={CTA.dashboard.href}>{CTA.dashboard.label}</Link>
              </Button>
            </div>
            <p className="text-sm text-slate-600">
              Want to try it first?{" "}
              <Link href={CTA.builder.href} className="font-semibold text-blue-600 underline-offset-4 hover:underline">
                {CTA.builder.label}
              </Link>{" "}
              without logging in.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center md:text-left">
                <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </header>

        <section aria-labelledby="conversion-highlights" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="conversion-highlights" className="text-3xl font-semibold text-slate-900">
              {targetFeaturesHeading}
            </h2>
            <ExploreLink />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {VALUE_PILLARS.map((pillar) => (
              <article key={pillar.title} className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{pillar.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="how-it-works" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
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
              <Link href={CTA.builder.href}>{CTA.builder.label}</Link>
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
            <ExploreLink />
          </div>
          <p className="mt-2 text-slate-700">
            Clause controls, compliance-ready exports, and real-time storage are included in every plan so nothing stands
            between you and a signed deal.
          </p>
          <FeaturesGrid />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={CTA.builder.href}>{CTA.builder.label}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={CTA.upgrade.href}>{CTA.upgrade.label}</Link>
            </Button>
          </div>
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
                Want to see them in action?{" "}
                <Link
                  href={CTA.builder.href}
                  className="font-semibold text-blue-700 underline-offset-4 hover:underline"
                >
                  {CTA.builder.label}
                </Link>{" "}
                and load any template right now.
              </p>
            </div>
            {/* <Button asChild size="lg">
              <Link href="/contracts">Try Now</Link>
            </Button> */}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {Object.entries(CONTRACT_LIBRARY)
              .slice(0, 4)
              .map(([key, template]) => (
                <article key={key} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">Template highlight</p>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{template.label}</h3>
                  <p className="text-sm text-slate-700">{template.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-800">
                    {template.checklist.slice(0, 3).map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-4" aria-label="Start with this template">
                    <Link href={CTA.builder.href}>Start with this template</Link>
                  </Button>
                </article>
              ))}
          </div>
        </section>

        <DashboardHighlight />

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
          <p className="mt-2 text-slate-700">Share this table with stakeholders when they ask why Make My Contract wins.</p>
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
              <Link href={CTA.builder.href}>{CTA.builder.label}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={CTA.upgrade.href}>{CTA.upgrade.label}</Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="pricing" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="pricing" className="text-3xl font-semibold text-slate-900">
            Upgrade in minutes, keep every contract forever
          </h2>
          <p className="mt-2 text-slate-700">
            Weekly, monthly, and annual plans include unlimited documents, dashboard history, and PDF exports. Upgrade the
            moment you’re ready to generate and we’ll restore your drafts automatically.
          </p>
          <PricingSection isAuthenticated={Boolean(user)} />
        </section>

        <section id="faq" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl" aria-labelledby="faq-heading">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="faq-heading" className="text-3xl font-semibold text-slate-900">
              FAQ: everything decision makers ask before subscribing
            </h2>
            <ExploreLink />
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
              <Link href={CTA.start.href}>{CTA.start.label}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/login">Sign in to keep editing</Link>
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
