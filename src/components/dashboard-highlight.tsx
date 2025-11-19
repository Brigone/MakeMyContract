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
    <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl max-[430px]:max-w-sm max-[430px]:p-3 sm:mt-12 sm:rounded-[32px] sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-[430px]:gap-3">
        <div>
          <Badge className="inline-flex px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
            Trusted workflow
          </Badge>
          <h2 className="mt-2 text-xl font-semibold leading-tight text-slate-900 max-[430px]:text-lg sm:text-3xl">
            Your permanent record of every signed agreement
          </h2>
          <p className="text-sm text-slate-800 max-[430px]:text-[0.9rem] sm:text-base">
            Browse, filter, and resend contracts with full history, clean PDF previews, and instant downloads.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-800 shadow-sm max-[430px]:px-4 max-[430px]:py-3 sm:rounded-3xl sm:px-6 sm:py-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Reliability</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">99.99%</p>
          <p className="text-xs text-slate-500">PDF delivery success rate</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 max-[430px]:gap-3 sm:mt-6 md:grid-cols-2">
        {sampleContracts.map((contract) => (
          <div
            key={contract.title}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 shadow-sm max-[430px]:p-3 sm:rounded-3xl sm:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Signed PDF · AES-256
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900 max-[430px]:text-sm sm:text-lg">{contract.title}</h3>
            <p className="text-xs text-slate-500">{contract.date}</p>
            <p className="mt-3 text-sm text-slate-700 max-[430px]:text-[0.9rem]">{contract.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
