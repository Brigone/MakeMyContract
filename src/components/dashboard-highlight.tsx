import { Badge } from "@/components/ui/badge";

const sampleContracts = [
  {
    title: "Freelance Services Agreement",
    date: "Apr 12, 2025 · Delaware",
    excerpt:
      "Client engages Contractor to provide fractional GC support, including vendor diligence, policy updates, and contract negotiations.",
  },
  {
    title: "Residential Lease Agreement",
    date: "Apr 9, 2025 · California",
    excerpt:
      "Landlord leases the property located at 81 Grand Ave., San Diego, CA for a 12-month term with automatic month-to-month renewal.",
  },
];

export function DashboardHighlight() {
  return (
    <section className="mx-auto mt-8 w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:mt-12 sm:rounded-[32px] sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge className="inline-flex px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] sm:text-[0.65rem]">
            Trusted workflow
          </Badge>
          <h2 className="mt-2 text-xl font-semibold leading-tight text-slate-900 sm:text-3xl">
            Your permanent record of every signed agreement
          </h2>
          <p className="text-sm text-slate-800 sm:text-base">
            Browse, filter, and resend contracts with full history, clean PDF previews, and instant downloads.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm sm:px-6 sm:py-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Reliability</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">99.99%</p>
          <p className="text-xs text-slate-500">PDF delivery success rate</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:mt-6 md:grid-cols-2">
        {sampleContracts.map((contract) => (
          <div
            key={contract.title}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 shadow-sm sm:rounded-3xl sm:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Signed PDF · AES-256</p>
            <h3 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">{contract.title}</h3>
            <p className="text-xs text-slate-500">{contract.date}</p>
            <p className="mt-3 text-sm text-slate-700">{contract.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
