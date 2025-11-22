"use client";

import { useEffect } from "react";
import { fireAdsConversion } from "@/lib/ads-tracking";

interface PaymentConversionWatcherProps {
  shouldFire: boolean;
}

export function PaymentConversionWatcher({ shouldFire }: PaymentConversionWatcherProps) {
  useEffect(() => {
    if (!shouldFire) return;
    fireAdsConversion("Payment");
  }, [shouldFire]);

  return null;
}
