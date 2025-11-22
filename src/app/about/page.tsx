import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RouteAwareButton } from "@/components/route-aware-button";
import { getCurrentUser } from "@/lib/auth";
import { CONTRACT_LIBRARY } from "@/lib/contracts-engine";
import { SmartCtaBar } from "@/components/layout/smart-cta-bar";

export const metadata: Metadata = {
  title: "Make My Contract - signature-ready contracts in minutes",
  description:
    "Pick a template, answer simple prompts, and generate a polished contract before the deal goes cold. Zero legal jargon.",
  keywords: ["contract generator", "online contract template", "NDA builder", "lease agreement", "create contract fast"],
  alternates: { canonical: "https://makemycontract.com/" },
  openGraph: {
    title: "Make My Contract - signature-ready contracts in minutes",
    description: "Choose → Fill → Generate. Modern SaaS speed for real contracts.",
    url: "https://makemycontract.com/",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

const totalContractTemplates = Object.keys(CONTRACT_LIBRARY).length;

const microCopy = ["Start in 60 seconds", "No legal jargon", "Instant download", "100% editable"];

const flowSteps = [
  {
    title: "1. Choose a template",
    detail: `${totalContractTemplates}+ operator-approved contracts for leases, NDAs, offers, and more.`,
  },
  {
    title: "2. Fill simple prompts",
    detail: "Short, human questions capture the facts once and update every clause instantly.",
  },
  {
    title: "3. Generate the PDF",
    detail: "Tap Generate Contract or Buy Now and download a signature-ready file in one click.",
  },
];

const templateSpotlight = [
  { title: "Residential lease", time: "52 sec avg", benefit: "Correct disclosures for every U.S. state." },
  { title: "One-click NDA", time: "41 sec avg", benefit: "Confidentiality, IP, and non-solicit in plain English." },
  { title: "Service agreement", time: "63 sec avg", benefit: "Scope, payment, and protection without lawyer-speak." },
];

const proofPoints = [
  { value: "312,000+", label: "contracts shipped" },
  { value: "58 sec", label: "average build time" },
  { value: "96%", label: "renewal rate" },
];

const testimonials = [
  {
    quote: '"I answered a handful of prompts and emailed the contract before the competitor even replied."',
    author: "Eric, property operator",
  },
  {
    quote: '"My team finally understands contracts with zero training. It feels like autopilot."',
    author: "Maya, fractional COO",
  },
];

export default async function Home() {
  const user = await getCurrentUser();
  const isSubscribed = hasActivePlan(user?.plan);

  const generateCta = isSubscribed
    ? { label: "Generate Contract", href: "/contracts" }
    : { label: "Buy Now", href: "/pricing" };

  return (
    <>
      <main className="bg-white text-slate-900">
        <article className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-32 pt-10 sm:px-6 sm:pb-36 lg:px-0">
        <section
          aria-labelledby="hero"
          className="w-full rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_40px_100px_rgba(15,23,42,0.08)] sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">Built for speed</p>
          <h1 id="hero" className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Create a signature-ready contract before the deal goes cold.
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Choose a template, answer simple prompts, and export a polished PDF in under a minute. Everything saves
            automatically so you can finish later without losing progress.
          </p>
          <ul className="mt-6 grid gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400 sm:grid-cols-2">
            {microCopy.map((copy) => (
              <li key={copy}>
                <Link
                  href="/contracts"
                  className="block rounded-full border border-slate-200 px-4 py-2 text-center text-[0.7rem] transition hover:border-blue-200 hover:text-blue-700"
                  aria-label={`${copy}. Go to contract builder.`}
                >
                  {copy}
                </Link>
              </li>
            ))}
          </ul>
          <RouteAwareButton
            href="/draft"
            size="lg"
            className="mt-8 w-full rounded-2xl py-5 text-base font-semibold sm:w-fit sm:px-10"
            sameRouteMessage="You’re already inside the builder. Scroll to keep going."
            conversionEvent="StartContract"
          >
            Create Contract
          </RouteAwareButton>
          <p className="mt-3 text-sm text-slate-500">Start without logging in. Drafts auto-resume after signup.</p>
        </section>

        <section id="flow" aria-label="Main flow" className="w-full rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Only three steps</p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Choose → Fill → Generate</h2>
            </div>
            <span className="text-sm font-medium text-slate-500">No distractions. No guesswork.</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {flowSteps.map((step) => (
              <Link
                key={step.title}
                href="/contracts"
                className="rounded-2xl border border-white bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200"
                aria-label={`${step.title}. Continue to the builder.`}
              >
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.detail}</p>
              </Link>
            ))}
          </div>
          <RouteAwareButton
            href="/draft"
            size="lg"
            className="mt-6 w-full rounded-2xl py-5 text-base font-semibold sm:w-fit sm:px-10"
            sameRouteMessage="You’re already on the builder—scroll and continue."
            conversionEvent="StartContract"
          >
            Continue
          </RouteAwareButton>
        </section>

        <section id="templates" aria-label="Template library" className="w-full rounded-[28px] border border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Templates built for real deals</h2>
            <p className="text-sm text-slate-500">{totalContractTemplates}+ attorney-shaped structures. Zero fluff.</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {templateSpotlight.map((template) => (
              <Link
                key={template.title}
                href="/contracts"
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-200"
                aria-label={`Open the ${template.title} template.`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{template.time}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{template.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{template.benefit}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-label="Proof" className="w-full rounded-[28px] border border-slate-200 bg-white p-5 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Make My Contract never slows a deal</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <Link
                key={point.label}
                href="/contracts"
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-200"
                aria-label={`${point.label}. Continue to generate a contract.`}
              >
                <p className="text-3xl font-semibold text-slate-900">{point.value}</p>
                <p className="mt-2 text-sm text-slate-600">{point.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="w-full rounded-[28px] border border-slate-200 bg-white p-5 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Real teams, real signatures</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Link
                key={testimonial.author}
                href="/contracts"
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-200"
                aria-label={`See how ${testimonial.author} uses Make My Contract.`}
              >
                <p className="text-base text-slate-700">{testimonial.quote}</p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{testimonial.author}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="w-full rounded-[32px] border border-blue-200 bg-white p-6 sm:p-10">
          <h2 className="text-3xl font-semibold text-slate-900">Ready to finish your next contract?</h2>
          <p className="mt-3 text-base text-slate-600">
            Tap {generateCta.label}. If you still need a plan, we take you straight to checkout and restore your draft as soon
            as payment clears.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 w-full rounded-2xl border border-blue-200 bg-blue-600 text-white hover:bg-blue-500 sm:w-fit sm:px-10"
          >
            <Link href={generateCta.href}>{generateCta.label}</Link>
          </Button>
        </section>
      </article>
    </main>
    <SmartCtaBar />
    </>
  );
}
