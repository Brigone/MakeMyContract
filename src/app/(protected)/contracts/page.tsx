import Link from "next/link";
import { CONTRACT_LIBRARY } from "@/lib/contracts-engine";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ContractTypeSelection() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 text-slate-700">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge>Rental form library</Badge>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Choose a rental form to generate.
            </h1>
            <p className="text-sm text-slate-600">
              Every rental template is deterministic, U.S. focused, and renders directly to PDF with your subscription.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {Object.entries(CONTRACT_LIBRARY).map(([type, template]) => (
            <div
              key={type}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">
                  {template.categoryLabel}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{template.label}</h2>
                <p className="mt-1 text-sm text-slate-700">{template.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
                {template.checklist.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 px-3 py-1 text-slate-500"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Button asChild className="mt-6">
                <Link href={`/contracts/create/${type}`}>Use rental template</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
