"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fireAdsConversion } from "@/lib/ads-tracking";

interface RouteAwareButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  sameRouteMessage?: string;
  scrollTargetId?: string;
  conversionEvent?: "StartContract" | "SignUp" | "Payment";
}

const normalizePath = (value: string) => {
  if (value === "/") return "/draft";
  return value;
};

export function RouteAwareButton({
  href,
  children,
  className,
  variant,
  size,
  sameRouteMessage = "You’re already here—scroll down and continue.",
  scrollTargetId,
  conversionEvent,
}: RouteAwareButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [hint, setHint] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const current = normalizePath(pathname ?? "/");
    const destination = normalizePath(href);
    if (conversionEvent) {
      fireAdsConversion(conversionEvent);
    }
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
    <div className="relative inline-flex">
      <Button type="button" variant={variant} size={size} className={className} onClick={handleClick}>
        {children}
      </Button>
      {hint && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-blue-200 bg-white p-3 text-xs text-slate-700 shadow-xl">
          {sameRouteMessage}
        </div>
      )}
    </div>
  );
}
