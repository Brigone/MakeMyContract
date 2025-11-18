export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white">{children}</div>;
}
