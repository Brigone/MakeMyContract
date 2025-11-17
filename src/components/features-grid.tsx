import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles, Timer, Database, FileText, CreditCard } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Lightning-fast creation",
    description: "Answer a short guided form and review a polished rental agreement in under a minute.",
  },
  {
    icon: Sparkles,
    title: "Crystal clear language",
    description: "Clauses read like a top-tier landlord attorney drafted them—no confusing legalese.",
  },
  {
    icon: Shield,
    title: "U.S. legal confidence",
    description: "Every template mirrors the structure attorneys rely on for nationwide enforcement.",
  },
  {
    icon: FileText,
    title: "Signature-ready PDFs",
    description: "Download beautiful rental documents with signature blocks, pagination, and professional styling.",
  },
  {
    icon: CreditCard,
    title: "Fair, simple pricing",
    description: "Switch between weekly, monthly, or annual access so billing matches your vacancy flow.",
  },
  {
    icon: Database,
    title: "Always-on recordkeeping",
    description: "Your dashboard stores every version, making it easy to resend, duplicate, or update rental forms.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-6xl py-16">
      <Badge>Why teams switch</Badge>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">
        Tools that feel like your own leasing department
      </h2>
      <p className="mt-2 max-w-3xl text-base text-slate-800">
        Make My Rental blends attorney-grade structure with the speed and polish of a modern SaaS platform. Every feature keeps you focused on managing properties—not juggling paperwork.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                <Icon size={20} />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-800">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
