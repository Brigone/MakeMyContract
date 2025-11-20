import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles, Timer, Database, FileText, CreditCard } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Lightning-fast creation",
    description: "Answer a short guided form and review a polished agreement in under a minute.",
  },
  {
    icon: Sparkles,
    title: "Crystal clear language",
    description: "Clauses read like a top-tier attorney drafted them—no confusing legalese.",
  },
  {
    icon: Shield,
    title: "U.S. legal confidence",
    description: "Every contract mirrors the structure attorneys rely on for nationwide enforcement.",
  },
  {
    icon: FileText,
    title: "Signature-ready PDFs",
    description: "Download beautiful documents with signature blocks, pagination, and professional styling.",
  },
  {
    icon: CreditCard,
    title: "Fair, simple pricing",
    description: "Switch between weekly, monthly, or annual access so billing matches your deal flow.",
  },
  {
    icon: Database,
    title: "Always-on recordkeeping",
    description: "Your dashboard stores every version, making it easy to resend, duplicate, or update contracts.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Badge className="inline-flex items-center px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] sm:text-[0.65rem]">
        Why teams switch
      </Badge>
      <h2 className="mt-3 text-xl font-semibold leading-tight text-slate-900 sm:text-3xl">
        Tools that feel like your own legal department
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-800 sm:text-base">
        Make My Contract blends attorney-grade structure with the speed and polish of a modern SaaS platform. Every feature
        keeps you focused on running your business—not juggling paperwork.
      </p>
      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-blue-50 p-2.5 text-blue-700">
                <Icon size={20} />
              </span>
              <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-800">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
