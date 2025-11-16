import Link from "next/link";
import { requireActiveSubscription } from "@/lib/auth";
import { getContractsForUser } from "@/lib/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardPageProps {
  searchParams?: {
    session_id?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await requireActiveSubscription();
  const contracts = await getContractsForUser(user.uid);
  const hasCheckoutSession = typeof searchParams?.session_id === "string" && searchParams.session_id.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 text-slate-700">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge>Dashboard</Badge>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Your contract command center</h1>
            <p className="text-sm text-slate-800">
              Keep every agreement in one secure, organized place with instant downloads and quick filters.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="secondary">
              <Link href="/contracts">New contract</Link>
            </Button>
            <Button asChild>
              <Link href="/pricing">Manage plan</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          {contracts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
              <h3 className="text-xl font-semibold text-slate-900">No contracts yet</h3>
              <p className="mt-2 text-sm text-slate-800">
                Generate your first attorney-style agreement to unlock this space with organized history and quick actions.
              </p>
              <Button asChild className="mt-6">
                <Link href="/contracts">Create your first contract</Link>
              </Button>
            </div>
          )}
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-lg font-semibold text-slate-900">{contract.title}</p>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {contract.contractType}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(contract.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <p className="mt-3 line-clamp-4 text-sm text-slate-600">{contract.content}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/api/contracts/pdf?contractId=${contract.id}`}>Download PDF</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href={`/contracts/${contract.id}`}>View details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {hasCheckoutSession && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag('event', 'conversion', {
                  send_to: 'AW-17730578494/JZMsCLeLpsEbEL7QzIZC',
                  transaction_id: '${searchParams?.session_id ?? ""}'
                });
              }
            `,
          }}
        />
      )}
    </div>
  );
}
