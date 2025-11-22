import Link from "next/link";
interface SmartLinkProps {
  className?: string;
}

export async function SmartLink({ className }: SmartLinkProps) {
  return (
    <Link href="/" className={className}>
      Make My Contract
    </Link>
  );
}
