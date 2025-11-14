import { requireActiveSubscription } from "@/lib/auth";
import { PaywallGuard } from "@/components/guards/paywall-guard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireActiveSubscription();
  return (
    <PaywallGuard plan={user.plan}>
      <div className="bg-white">{children}</div>
    </PaywallGuard>
  );
}
