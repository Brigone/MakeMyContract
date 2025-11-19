"use client";

import { useState } from "react";
import { PLAN_CONFIG, type PlanTier } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingSectionProps {
  isAuthenticated: boolean;
}

const planMeta: Record<
  PlanTier,
  {
    badge?: string;
    cta: string;
    highlight?: string;
  }
> = {
  weekly: {
    badge: "Trial friendly",
    cta: "Start free week",
  },
  monthly: {
    badge: "Most popular",
    cta: "Start monthly access",
    highlight: "Chosen by operators who generate contracts weekly.",
  },
  annual: {
    badge: "Best value",
    cta: "Unlock annual access",
    highlight: "Ideal for teams replacing outside counsel retainers.",
  },
};

export function PricingSection({ isAuthenticated }: PricingSectionProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (priceIdEnv: string) => {
    if (!isAuthenticated) {
      window.location.href = "/signup";
      return;
    }
    try {
      setLoadingPlan(priceIdEnv);
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: priceIdEnv }),
      });
      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!response.ok) {
        throw new Error("Checkout is temporarily unavailable. Please contact support.");
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Checkout is temporarily unavailable. Please contact support."
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="mx-auto max-w-6xl py-10 sm:py-16">
      <div className="text-center space-y-3">
        <Badge className="mx-auto w-fit">Plans built to convert</Badge>
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Choose the access that matches your deal flow
        </h2>
        <p className="text-base text-slate-800">
          Run unlimited contracts for a week, stay covered month-to-month, or lock annual access for the best value. Your draft
          pauses are saved and resume the second checkout completes.
        </p>
      </div>
      <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3 lg:gap-8">
        {PLAN_CONFIG.map((plan) => (
          <div
            key={plan.id}
            className={`flex h-full flex-col rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-md backdrop-blur ${
              plan.id === "monthly" ? "border-blue-200 ring-2 ring-blue-100 shadow-xl" : ""
            }`}
          >
            <div>
              <p className="text-3xl font-semibold text-slate-900">{plan.price}</p>
              <span className="text-sm text-slate-500">{plan.cadence}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{plan.label}</h3>
            <p className="text-sm text-slate-800">{plan.description}</p>
            {planMeta[plan.id]?.badge && (
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                {planMeta[plan.id]?.badge}
              </span>
            )}
            {planMeta[plan.id]?.highlight && (
              <p className="mt-2 text-xs text-slate-500">{planMeta[plan.id]!.highlight}</p>
            )}
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-800">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button
                className="w-full"
                type="button"
                disabled={loadingPlan === plan.priceIdEnv}
                onClick={() => handleCheckout(plan.priceIdEnv)}
              >
                {loadingPlan === plan.priceIdEnv ? "Redirecting..." : planMeta[plan.id]?.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50/80 p-5 text-sm text-slate-800 shadow-inner">
        <p className="font-semibold text-slate-900">Need help choosing?</p>
        <p className="mt-1">
          Start on the weekly plan if you&apos;re testing the builder—upgrade to monthly or annual anytime without losing drafts.
        </p>
      </div>
      <div className="mt-6 md:hidden">
        <div className="sticky bottom-4 rounded-3xl border border-blue-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
          <p className="text-sm font-semibold text-slate-900">On mobile? Tap once and finish checkout later.</p>
          <Button
            type="button"
            className="mt-3 w-full"
            onClick={() => {
              const monthlyPlan = PLAN_CONFIG.find((plan) => plan.id === "monthly");
              if (monthlyPlan) {
                handleCheckout(monthlyPlan.priceIdEnv);
              }
            }}
          >
            Start monthly access
          </Button>
        </div>
      </div>
    </section>
  );
}
