"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface RouteAwareLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  sameRouteMessage?: string;
  scrollTargetId?: string;
}

const normalizePath = (value: string) => {
  if (value === "/") return "/draft";
  return value;
};

export function RouteAwareLink({
  href,
  children,
  className,
  sameRouteMessage = "You’re already on this page.",
  scrollTargetId,
}: RouteAwareLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [hint, setHint] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const current = normalizePath(pathname ?? "/");
    const destination = normalizePath(href);
    if (current === destination) {
      setHint(true);
      if (scrollTargetId) {
        const target = document.getElementById(scrollTargetId);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.setTimeout(() => setHint(false), 4000);
      return;
    }
    router.push(href);
  };

  return (
    <span className="relative inline-flex">
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
      {hint && (
        <span className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-xl">
          {sameRouteMessage}
        </span>
      )}
    </span>
  );
}
