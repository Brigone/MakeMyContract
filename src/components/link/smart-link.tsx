import Link from "next/link";
import { headers } from "next/headers";

interface SmartLinkProps {
  className?: string;
}

export async function SmartLink({ className }: SmartLinkProps) {
  const currentPath = headers().get("x-current-pathname") ?? "/";
  const href = currentPath === "/" ? "/contracts" : "/";

  return (
    <Link href={href} className={className}>
      Make My Contract
    </Link>
  );
}
