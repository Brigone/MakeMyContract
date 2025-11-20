import { requireActiveSubscription } from "@/lib/auth";
import { getAiDraftsForUser } from "@/lib/firestore";
import { AiGeneratorClient } from "@/components/ai-generator/ai-generator-client";

export const dynamic = "force-dynamic";

export default async function AiGeneratorPage() {
  const user = await requireActiveSubscription();
  const drafts = await getAiDraftsForUser(user.uid);

  return (
    <div className="min-h-screen bg-slate-50">
      <AiGeneratorClient initialDrafts={drafts} />
    </div>
  );
}
