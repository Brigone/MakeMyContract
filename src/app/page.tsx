import { DraftWizard } from "@/components/draft-wizard/draft-wizard";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Make My Contract – Start a Contract",
  description: "Pick a contract type and finish it in minutes.",
};

export default async function ContractHomePage() {
  const user = await getCurrentUser();

  return (
    <main className="bg-slate-50 text-slate-900">
      <DraftWizard user={user} showBackLink={false} />
    </main>
  );
}
