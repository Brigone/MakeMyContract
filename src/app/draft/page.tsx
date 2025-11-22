import { getCurrentUser } from "@/lib/auth";
import { DraftWizard } from "@/components/draft-wizard/draft-wizard";

export const metadata = {
  title: "Start a Contract",
  description: "Choose a contract type and finish the paperwork in minutes.",
};

export default async function DraftPage() {
  const user = await getCurrentUser();

  return (
    <main className="bg-slate-50 text-slate-900">
      <DraftWizard user={user} />
    </main>
  );
}
