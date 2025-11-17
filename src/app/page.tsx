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
  title: "Make My Rental – Create Rental Agreements Online",
  description:
    "Landlord forms, leases, notices, and addendums. Fully editable rental documents in minutes.",
  keywords: [
    "rental agreement generator",
    "landlord forms",
    "rental templates",
    "lease builder",
    "Airbnb rental agreement",
    "tenant notice template",
    "property management paperwork",
  ],
  alternates: {
    canonical: "https://makemyrental.com/",
  },
  openGraph: {
    title: "Make My Rental – Create Rental Agreements Online",
    description:
      "Landlords, renters, and hosts edit guided templates and download rental PDFs instantly.",
    url: "https://makemyrental.com/",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const contractSpotlight = [
  {
    id: "contract-residential",
    title: "Residential Lease Agreement",
    summary:
      "Lock in rent, deposits, inspections, and maintenance for long-term tenants while honoring state disclosures.",
    bullets: [
      "Auto-builds payment schedules and late-fee logic",
      "Maintenance, entry, and renewal clauses included",
      "Instantly exportable to signature-ready PDF",
    ],
  },
  {
    id: "contract-monthly",
    title: "Month-to-Month Lease",
    summary:
      "Keep flexible rentals compliant with rolling renewals, notice requirements, and prorated rent options.",
    bullets: [
      "Pick termination notice windows for each party",
      "Handles rent changes and deposit increases",
      "Ideal for hybrid or short occupancy cycles",
    ],
  },
  {
    id: "contract-str",
    title: "Short-Term Rental (Airbnb)",
    summary:
      "Give guests crystal-clear rules, check-in details, and damage terms before they arrive at your Airbnb or vacation rental.",
    bullets: [
      "Customizable house rules and amenity schedules",
      "Security deposit and incidental fee language",
      "Great for Airbnb, Vrbo, and direct bookings",
    ],
  },
  {
    id: "contract-eviction",
    title: "Eviction & Notice Pack",
    summary:
      "Deliver compliant cure-or-quit instructions, proof of service, and timelines that match your state’s statute.",
    bullets: [
      "Auto-adjusts to pay-or-quit and no-cause versions",
      "Explains amounts owed in friendly language",
      "Keeps a PDF audit trail for courts",
    ],
  },
];

const PUBLIC_CONTRACTS_PATH = "/contract-templates";

const MoreContractsLink = ({ className }: { className?: string }) => (
  <Link
    href={PUBLIC_CONTRACTS_PATH}
    aria-label="See more rental templates"
    className={`inline-flex items-center gap-1 text-sm font-semibold text-blue-700 underline-offset-4 hover:text-blue-600 hover:underline ${className ?? ""}`.trim()}
  >
    See more rental templates
    <span aria-hidden="true">→</span>
  </Link>
);

const totalContractTemplates = Object.keys(CONTRACT_LIBRARY).length;

const platformMetrics = [
  {
    value: "312,000+",
    label: "Rental forms generated",
    detail: "Landlords send leases, notices, and checklists in under a minute.",
  },
  {
    value: "58 sec",
    label: "Average build time",
    detail: "Guided intake collects property, tenant, and rent terms once.",
  },
  {
    value: "96%",
    label: "Subscriber renewal rate",
    detail: "Operators keep Make My Rental because paperwork never slows turnovers.",
  },
  {
    value: "$12.4M",
    label: "Deposits protected",
    detail: "Customers credit automated forms with preserving deposits and cash flow.",
  },
];

const targetAudience = [
  "Landlords",
  "Property managers",
  "Airbnb hosts",
  "Tenant screening teams",
  "Real estate investors",
  "Short-term rentals",
];

const conversionHighlights = [
  {
    title: "Lease-grade speed",
    detail:
      "Guided intake collects property, rent, deposit, and notice requirements so you can send signature-ready PDFs before prospects tour their next unit.",
  },
  {
    title: "Unlimited landlord paperwork",
    detail: "Revise, resend, and archive every agreement with zero per-document fees—built for growing portfolios.",
  },
  {
    title: "Confidence for renters and co-signers",
    detail:
      "Plain-English summaries sit on top of legal clauses so tenants, guarantors, and guests understand every term instantly.",
  },
];

const activationSteps = [
  {
    title: "Claim the $1 landlord trial",
    detail: "Apply coupon WELCOME on Unlimited Weekly to unlock every rental template for one dollar.",
  },
  {
    title: "Answer the guided intake once",
    detail: "Enter property details, tenant info, rent terms, and optional addendums. The engine applies state-specific clauses instantly.",
  },
  {
    title: "Download & reuse",
    detail:
      "Export signature-ready rental PDFs, duplicate prior leases, and keep version history synced to every unit.",
  },
];

const reassurancePoints = [
  {
    title: "Security + audit readiness",
    detail: "Firebase Auth, encrypted history, and Stripe billing keep lease data, SSNs, and deposits under lock and key.",
  },
  {
    title: "Zero-risk welcome week",
    detail: "Start for $1, unlock every rental template, and cancel before the week ends if Make My Rental isn’t a fit.",
  },
  {
    title: "Landlord support on standby",
    detail: "Chat with our rental specialists for clause guidance, screening tips, or Stripe billing adjustments.",
  },
];

const testimonialQuotes = [
  {
    quote:
      "We replaced our folder of old leases with Make My Rental. Every resident now gets the right addendums and deposit rules in under a minute.",
    author: "Maya Thompson",
    role: "Portfolio Manager, RevOps Collective Rentals",
  },
  {
    quote: "The $1 welcome week paid for itself by day two—we approved an Airbnb guest, sent a short-term agreement, and collected deposits before the competitor even replied.",
    author: "Eric Lopez",
    role: "Principal, Sunbelt Property Group",
  },
];

const comparisonGrid = [
  {
    label: "Average cost per rental form",
    makeMyRental: "$0 after subscription",
    lawFirm: "$450+ per document",
    template: "Hidden upsells",
  },
  {
    label: "Time to generate",
    makeMyRental: "30–60 seconds",
    lawFirm: "2–5 business days",
    template: "30 minutes + manual edits",
  },
  {
    label: "PDF + signature-ready formatting",
    makeMyRental: "Included and automatic",
    lawFirm: "Extra billing",
    template: "Requires copy/paste",
  },
  {
    label: "Storage & history",
    makeMyRental: "Unlimited dashboard history",
    lawFirm: "Email attachments only",
    template: "No archival",
  },
];

const faqItems = [
  {
    question: "How fast can I create a rental agreement online?",
    answer:
      "Most Make My Rental users finish a guided intake in under one minute and download a PDF instantly. The builder uses deterministic landlord language, so there is zero waiting on an attorney.",
  },
  {
    question: "Are the rental forms compliant in every U.S. state?",
    answer:
      "Yes. Each template contains jurisdiction-aware governing-law, disclosures, and notice timelines. Pick the state during intake and Make My Rental formats the clauses automatically.",
  },
  {
    question: "How does Make My Rental compare to LegalZoom, RocketLawyer, or PandaDoc?",
    answer:
      "Competitors rely on generic business contracts or upsell attorney reviews. Make My Rental is purpose-built for leases, notices, checklists, and Airbnb paperwork with unlimited usage baked in.",
  },
  {
    question: "Can I edit clauses before downloading the PDF?",
    answer:
      "Absolutely. Each intake step supports custom clauses, house rules, rent escalations, inspection notes, and more. The PDF reflects your edits instantly.",
  },
  {
    question: "Does Make My Rental store my agreements?",
    answer:
      "Every rental form is saved to your encrypted dashboard. Resend, regenerate with new facts, or download the PDF anytime. Paid accounts keep unlimited history per unit.",
  },
  {
    question: "Is Make My Rental a law firm?",
    answer:
      "No. We provide deterministic legal-grade templates for landlords, but we are not a law firm and cannot offer personalized legal advice. Export any PDF for review by counsel.",
  },
  {
    question: "Which property types use Make My Rental?",
    answer:
      "Single-family landlords, multifamily operators, Airbnb hosts, property managers, and short-term rental teams rely on Make My Rental to replace ad-hoc paperwork.",
  },
  {
    question: "How much does the rental paperwork generator cost?",
    answer:
      "Choose Unlimited Weekly ($9), Unlimited Monthly ($19), or Unlimited Annual ($99). Use coupon WELCOME to make your first Weekly plan just $1, then stick with the cadence that matches your units. All tiers unlock unlimited forms, history, and PDF downloads.",
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
          <Badge className="w-fit bg-blue-600/10 text-blue-800">Landlord-ready in 60 seconds</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Create Rental Agreements in Minutes
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Landlord forms, leases, notices, and addendums. Fully editable and ready to download instantly.
          </p>
          <p className="mt-3 text-base text-slate-700">
            Make My Rental lets landlords, property managers, renters, and Airbnb hosts spin up attorney-structured
            leases, tenant notices, and turnover checklists without juggling Word docs or waiting on counsel.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-blue-700">
            {targetAudience.map((persona) => (
              <li key={persona} className="rounded-full border border-blue-200 px-3 py-1 text-blue-800">
                {persona}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" aria-label="Start drafting rental forms for $1">
              <Link href="/signup">Start rental form for $1</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              aria-label={isAuthenticated ? "Open dashboard" : "See rental templates"}
            >
              <Link href={isAuthenticated ? "/dashboard" : PUBLIC_CONTRACTS_PATH}>
                {isAuthenticated ? "Open dashboard" : "Browse rental templates"}
              </Link>
            </Button>
          </div>
          <p className="mt-3 text-sm text-blue-900">
            Limited Welcome Offer: Use coupon <span className="font-semibold">WELCOME</span> on the Weekly plan to unlock
            every feature for $1 during your first 7 days. Experience the full platform, cancel anytime, and keep every
            rental form you generate.
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
            Trusted by landlords who need legal-grade paperwork without slowing down acquisitions, turnovers, or guest
            onboarding.
          </p>
        </header>

        <section
          aria-labelledby="conversion-highlights"
          className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 id="conversion-highlights" className="text-3xl font-semibold text-slate-900">
              Why landlords upgrade before their next vacancy
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
        <section
          aria-labelledby="proof"
          className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="proof" className="text-3xl font-semibold text-slate-900">
                Proof that Make My Rental keeps units filled
              </h2>
              <p className="mt-2 text-slate-700">
                Subscriber metrics and renewals show how much vacancy time disappears once paperwork is automated.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/signup">Start issuing rental forms</Link>
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
        </section>

        <section
          aria-labelledby="how-it-works"
          className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="how-it-works" className="text-3xl font-semibold text-slate-900">
                From vacancy to signed rental form in three steps
              </h2>
              <p className="mt-2 text-slate-700">
                Every intake is deterministic, so you can trust the PDF without calling your attorney before every move-in.
              </p>
            </div>
            <Button asChild>
              <Link href="/signup">Start now</Link>
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
              Everything you need to remove rental paperwork friction
            </h2>
            <MoreContractsLink />
          </div>
          <p className="mt-2 text-slate-700">
            Clause controls, compliance-ready exports, and real-time storage are included in every plan so nothing stands
            between you and a signed lease.
          </p>
          <FeaturesGrid />
        </section>

        <section aria-labelledby="dashboard" className="rounded-[32px] border border-slate-200 bg-white p-10 mt-10 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="dashboard" className="text-3xl font-semibold text-slate-900">
                Monitor every rental form from a single source of truth
              </h2>
              <p className="mt-2 text-slate-700">
                Smart filters, resend links, and PDF history keep property managers, leasing teams, and accounting aligned.
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
                Rental template library built for urgent move-ins
              </h2>
              <p className="text-slate-700">
                Launch instantly with attorney-structured leases, notices, checklists, and Airbnb agreements. Every plan
                unlocks {totalContractTemplates}+ templates plus unlimited revisions.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Looking for another agreement?{" "}
                <Link
                  href={PUBLIC_CONTRACTS_PATH}
                  className="font-semibold text-blue-700 underline-offset-4 hover:text-blue-600 hover:underline"
                >
                  Open the full directory
                </Link>{" "}
                to see every rental form that’s included.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/signup">Claim the $1 landlord week</Link>
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
            Confidence boosters built for landlords and hosts
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
            The fastest ROI compared to attorneys or template shops
          </h2>
          <p className="mt-2 text-slate-700">
            Share this table with partners, owners, or counsel when they ask why Make My Rental wins.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse rounded-3xl border border-slate-200 text-left text-sm">
              <thead>
                <tr className="bg-blue-50 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  <th scope="col" className="px-4 py-3 text-blue-900 sm:px-6">
                    Criteria
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Make My Rental
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
                    <td className="px-4 py-4 text-slate-800 sm:px-6">{row.makeMyRental}</td>
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
            Upgrade in minutes, keep every rental form forever
          </h2>
          <p className="mt-2 text-slate-700">
            Weekly, monthly, and annual plans include unlimited rental documents, dashboard history, and PDF exports. Use coupon
            WELCOME to test the Weekly plan for $1, then scale to the cadence that matches your property pipeline.
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
            Share these answers with owners, leasing teams, and attorneys to keep the approval loop tight.
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
