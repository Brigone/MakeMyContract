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
  title: "Create Legally-Safe Contracts Online in Minutes | Make My Contract",
  description:
    "Make My Contract is the premium online contract builder for founders, landlords, HR teams, and agencies who need attorney-level U.S. contracts, PDFs, and history in under a minute.",
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

const internalContractLinks = [
  { label: "Mutual NDA Generator", href: "#contract-nda" },
  { label: "Residential Lease Template", href: "#contract-lease" },
  { label: "Independent Contractor Agreement", href: "#contract-contractor" },
  { label: "Investor SAFE Template", href: "#contract-safe" },
];

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
      "Choose Unlimited Weekly ($9), Unlimited Monthly ($19), or Unlimited Annual ($99). Every plan unlocks unlimited agreements, dashboard history, and PDF downloads with no per-document fees.",
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
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-blue-700">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/#hero" className="hover:text-blue-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/pricing" className="hover:text-blue-700">
                  Pricing
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="#faq" className="hover:text-blue-700">
                  FAQ
                </Link>
              </li>
            </ol>
          </nav>
          <Badge className="mt-4 w-fit">Create contracts online</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Create legally-safe contracts online in minutes without waiting on a law firm.
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Make My Contract is the U.S. contract generator trusted by founders, landlords, HR directors,
            consultants, and in-house operators. Guided intake captures every fact once, optional clauses keep
            IP and confidentiality tight, and signature-ready PDFs download instantly. Stop juggling RocketLawyer
            subscriptions or templated Google Docs—ship polished, attorney-style agreements whenever the deal
            is hot.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" aria-label="Create your contract now">
              <Link href="/signup">Create your contract now</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              aria-label={isAuthenticated ? "Open dashboard" : "Sign in to Make My Contract"}
            >
              <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                {isAuthenticated ? "Open dashboard" : "Sign in"}
              </Link>
            </Button>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Want to review every template we offer?{" "}
            <Link
              href={PUBLIC_CONTRACTS_PATH}
              className="font-semibold text-blue-700 underline-offset-4 hover:text-blue-600 hover:underline"
            >
              See all contract types
            </Link>
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
            {internalContractLinks.map((item) => (
              <li key={item.href} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
                <Link href={item.href} className="font-semibold text-slate-900 hover:text-blue-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </header>

        <section className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl" aria-labelledby="value-hierarchy">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="value-hierarchy" className="text-3xl font-semibold text-slate-900">
              Build, explain, and deliver contracts with a value-first hierarchy
            </h2>
            <MoreContractsLink />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <article>
              <h3 className="text-xl font-semibold text-slate-900">1. What it is</h3>
              <p className="mt-2">
                Make My Contract is a premium online contract builder designed for the U.S. market. Each template
                mirrors the structure top firms rely on, but the experience is as fast as Stripe Checkout. The
                system keeps clauses deterministic, so you can trust the PDF every single time.
              </p>
            </article>
            <article>
              <h3 className="text-xl font-semibold text-slate-900">2. Who it is for</h3>
              <p className="mt-2">
                Founders, landlords, HR and People teams, marketing agencies, independent contractors, and even
                small private equity groups rely on Make My Contract when legal motion needs to be quick, clear,
                and defensible.
              </p>
            </article>
            <article>
              <h3 className="text-xl font-semibold text-slate-900">3. Why it matters</h3>
              <p className="mt-2">
                Deals stall when legal paperwork drags. By generating accurate contracts on demand, teams close
                revenue faster, capture tenants before they churn to a competitor, and document HR offers without
                scheduling an outside counsel call.
              </p>
            </article>
            <article>
              <h3 className="text-xl font-semibold text-slate-900">4. How it works</h3>
              <p className="mt-2">
                Enter party info, property addresses, payment amounts, and optional clauses one time. Make My Contract
                automatically formats attorney-grade language, builds a PDF with signature blocks, stores it in
                your dashboard, and lets you regenerate as fast as your business moves.
              </p>
            </article>
          </div>
        </section>

        <section aria-labelledby="features" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="features" className="text-3xl font-semibold text-slate-900">
              Contract features your legal team would approve
            </h2>
            <MoreContractsLink />
          </div>
          <p className="mt-2 text-slate-700">
            Every workflow is transparent, auditable, and secured end-to-end.
            Your team gets the clarity of a law firm with the speed of a SaaS platform.
          </p>
          <FeaturesGrid />
        </section>

        <section aria-labelledby="dashboard" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="dashboard" className="text-3xl font-semibold text-slate-900">
              Your contract operating system
            </h2>
            <MoreContractsLink />
          </div>
          <DashboardHighlight />
        </section>

        <section id="contract-library" aria-labelledby="template-gallery" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="template-gallery" className="text-3xl font-semibold text-slate-900">
                Contract library tuned for compliance and scale
              </h2>
              <p className="text-slate-700">
                Each contract landing section below includes long-form context, example use cases, and internal
                links for discoverability. Click any block to head directly into intake (subscription required),
                and remember that your plan also unlocks dozens of additional templates—employment offers, privacy
                notices, refund policies, loan agreements, and more.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Looking for another agreement? Our catalog covers {totalContractTemplates}+ templates spanning NDAs,
                leases, employment offers, policies, lending, and more—so chances are what you need is already inside.
                <Link
                  href={PUBLIC_CONTRACTS_PATH}
                  className="ml-2 font-semibold text-blue-700 underline-offset-4 hover:text-blue-600 hover:underline"
                >
                  Browse the full list.
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {contractSpotlight.map((contract) => (
              <article
                key={contract.id}
                id={contract.id}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">{contract.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{contract.summary}</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {contract.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild aria-label={`View pricing to unlock the ${contract.title}`}>
                  <Link href="/pricing">Unlock with a paid plan</Link>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="comparison" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="comparison" className="text-3xl font-semibold text-slate-900">
            Why modern teams pick Make My Contract over hiring a law firm
          </h2>
          <p className="mt-2">
            Use this comparison to convince procurement, revops, or compliance stakeholders that Make My Contract is
            safer and faster than legacy options like LegalZoom, RocketLawyer, PandaDoc, or Jotform downloads.
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
              <Link href="/pricing">Secure unlimited access</Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="pricing" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <h2 id="pricing" className="text-3xl font-semibold text-slate-900">
            Flexible pricing built for real-world deal flow
          </h2>
          <p className="mt-2 text-slate-700">
            Whether you only need a week of nonstop contracting or want enterprise-style annual savings, Make My Contract
            keeps billing predictable. Every plan unlocks the same unlimited PDF generation, dashboard history,
            and clause controls.
          </p>
          <PricingSection isAuthenticated={isAuthenticated} />
        </section>

        <section id="faq" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl" aria-labelledby="faq-heading">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="faq-heading" className="text-3xl font-semibold text-slate-900">
              Frequently asked questions about online contract builders
            </h2>
            <MoreContractsLink />
          </div>
          <p className="mt-2 text-slate-700">
            Search-friendly answers help your buyers, investors, and compliance partners trust the process.
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
              <Link href="/pricing#plans">Review plans again</Link>
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
