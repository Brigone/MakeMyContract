import Link from "next/link";
import { notFound } from "next/navigation";
import { requireActiveSubscription } from "@/lib/auth";
import { getContractByIdForUser } from "@/lib/firestore";
import { Button } from "@/components/ui/button";

interface ContractDetailPageProps {
  params: { contractId: string };
}

export default async function ContractDetailPage({ params }: ContractDetailPageProps) {
  const user = await requireActiveSubscription();
  const contract = await getContractByIdForUser({
    userId: user.uid,
    contractId: params.contractId,
  });
  if (!contract) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-slate-700">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-700">
              {contract.contractType}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{contract.title}</h1>
            <p className="text-sm text-slate-500">
              Generated {new Date(contract.createdAt).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={`/api/contracts/pdf?contractId=${contract.id}`} target="_blank" rel="noreferrer">
                Download rental PDF
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contracts">Generate new rental form</Link>
            </Button>
          </div>
        </div>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm leading-relaxed text-slate-800">
          <pre className="whitespace-pre-wrap">{contract.content}</pre>
        </div>
      </div>
    </div>
  );
}
