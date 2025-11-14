"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_TRACKING_ID, trackPageview } from "@/lib/analytics";

export function GA4Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_TRACKING_ID || !pathname) return;
    const url = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname;
    trackPageview(url);
  }, [pathname, searchParams]);

  return null;
}
