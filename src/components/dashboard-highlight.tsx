import { Badge } from "@/components/ui/badge";

const sampleContracts = [
  {
    title: "Residential Lease Agreement",
    date: "Apr 12, 2025 · Delaware",
    excerpt:
      "Landlord rents 214 Oakview Dr., Wilmington, DE to Tenant for $2,150 per month with 12-month term and two optional renewals.",
  },
  {
    title: "Short-Term Rental (Airbnb)",
    date: "Apr 9, 2025 · California",
    excerpt:
      "Host confirms 4-night stay at 81 Grand Ave., San Diego with $500 security deposit, quiet hours, and pet addendum attached.",
  },
];

export function DashboardHighlight() {
  return (
    <section className="mx-auto mt-12 max-w-6xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge>Trusted workflow</Badge>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Your permanent record of every rental document
          </h2>
          <p className="text-sm text-slate-800">
            Browse, filter, and resend leases, notices, and checklists with full history, clean PDF previews, and instant downloads.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-800 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Reliability</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">99.99%</p>
          <p className="text-xs text-slate-500">PDF delivery success rate</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sampleContracts.map((contract) => (
          <div
            key={contract.title}
            className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Signed PDF · AES-256
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{contract.title}</h3>
            <p className="text-xs text-slate-500">{contract.date}</p>
            <p className="mt-3 text-sm text-slate-700">{contract.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
