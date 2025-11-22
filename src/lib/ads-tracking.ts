"use client";

type AdsEvent = "StartContract" | "SignUp" | "Payment";

const EVENT_KEYS: Record<AdsEvent, string> = {
  StartContract: "ga_event_start_contract",
  SignUp: "ga_event_signup",
  Payment: "ga_event_payment",
};

const EVENT_CONVERSION_META: Partial<
  Record<
    AdsEvent,
    {
      sendTo: string;
      value?: number;
      currency?: string;
    }
  >
> = {
  StartContract: { sendTo: "AW-17730578494/GqcYCIffz8QbEL7QzIZC" },
  SignUp: { sendTo: "AW-17730578494/6xSBCKPP1MQbEL7QzIZC" },
  Payment: { sendTo: "AW-17730578494/K-PsCMXzz8QbEL7QzIZC", value: 9, currency: "USD" },
};

export const fireAdsConversion = (eventName: AdsEvent) => {
  if (typeof window === "undefined") return;
  try {
    const storageKey = EVENT_KEYS[eventName];
    if (window.sessionStorage.getItem(storageKey) === "1") return;
    window.sessionStorage.setItem(storageKey, "1");
    if (typeof window.gtag === "function") {
      const conversionMeta = EVENT_CONVERSION_META[eventName];
      if (conversionMeta) {
        window.gtag("event", "conversion", {
          send_to: conversionMeta.sendTo,
          value: conversionMeta.value,
          currency: conversionMeta.currency,
        });
      }
      window.gtag("event", eventName);
    }
  } catch {
    // swallow errors to avoid impacting UX
  }
};
