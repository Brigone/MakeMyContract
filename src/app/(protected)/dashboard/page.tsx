import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getContractsForUser } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { DraftResumeWatcher } from "@/components/draft-resume-watcher";

const hasActivePlan = (plan?: string | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";

interface DashboardPageProps {
  searchParams?: {
    session_id?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await getCurrentUser();
  const contracts = user ? await getContractsForUser(user.uid) : [];
  const hasCheckoutSession = typeof searchParams?.session_id === "string" && searchParams.session_id.length > 0;
  const canResumeDraft = Boolean(user && hasActivePlan(user.plan));
  const isSubscribed = hasActivePlan(user?.plan);

  const dashboardCta = isSubscribed
    ? { label: "Create Contract", href: "/contracts" }
    : { label: "Buy Now", href: "/pricing" };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 text-slate-900 sm:px-6 lg:px-0">
      <DraftResumeWatcher shouldResume={canResumeDraft} />
      <section className="w-full rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Next step</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">Pick up your contract exactly where you left.</h1>
        <p className="mt-3 text-base text-slate-600">
          Every draft stays saved. Use the button below to reopen the builder or finish checkout—no extra navigation required.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-6 w-full rounded-2xl py-5 text-base font-semibold sm:w-fit sm:px-10"
        >
          <Link href={dashboardCta.href}>{dashboardCta.label}</Link>
        </Button>
        <p className="mt-3 text-sm text-slate-500">Start in seconds. Drafts auto-resume after login or payment.</p>
      </section>

      {user ? (
        <section className="mt-10 w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Your contracts</h2>
            {contracts.length > 0 && (
              <span className="text-sm text-slate-500">{contracts.length} saved</span>
            )}
          </div>
          {contracts.length === 0 ? (
            <article className="w-full rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:p-10">
              <p className="text-xl font-semibold text-slate-900">No contracts yet</p>
              <p className="mt-2 text-sm text-slate-600">Open the builder and generate your first PDF right now.</p>
              <Button
                asChild
                size="lg"
                className="mt-6 w-full rounded-2xl py-5 text-base font-semibold sm:mx-auto sm:w-fit sm:px-10"
              >
                <Link href="/contracts">Create Contract</Link>
              </Button>
            </article>
          ) : (
            contracts.map((contract) => (
              <article
                key={contract.id}
                className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{contract.title}</p>
                    <p className="text-sm text-slate-500">{contract.contractType}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {new Date(contract.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600">{contract.content}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild size="sm" className="rounded-full px-6 text-sm font-semibold">
                    <Link href={`/contracts/${contract.id}`}>Continue</Link>
                  </Button>
                  <Link
                    href={`/api/contracts/pdf?contractId=${contract.id}`}
                    className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
                  >
                    Instant download
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>
      ) : (
        <section className="mt-10 w-full rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center sm:p-10">
          <h2 className="text-2xl font-semibold text-slate-900">Sign in to save everything</h2>
          <p className="mt-2 text-sm text-slate-600">
            Log in, upgrade when you’re ready, and keep every PDF organized automatically.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 w-full rounded-2xl py-5 text-base font-semibold sm:mx-auto sm:w-fit sm:px-10"
          >
            <Link href="/login">Continue</Link>
          </Button>
        </section>
      )}

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
