"use client";

import { useState } from "react";
import { PLAN_CONFIG } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingSectionProps {
  isAuthenticated: boolean;
}

export function PricingSection({ isAuthenticated }: PricingSectionProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (priceIdEnv: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
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
    <section id="pricing" className="mx-auto max-w-6xl py-16">
      <div className="text-center">
        <Badge>Plans</Badge>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
          Choose the access that matches your deal flow
        </h2>
        <p className="mt-2 text-base text-slate-800">
          Run unlimited contracts for a week, stay covered month-to-month, or lock annual access for the best value.
        </p>
      </div>
      <div className="mt-10 grid items-stretch gap-8 md:grid-cols-3 lg:gap-10">
        {PLAN_CONFIG.map((plan) => (
          <div
            key={plan.id}
            className={`flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-md ${
              plan.id === "annual" ? "border-blue-200 ring-2 ring-blue-100 shadow-lg" : ""
            }`}
          >
            <div>
              <p className="text-3xl font-semibold text-slate-900">{plan.price}</p>
              <span className="text-sm text-slate-500">{plan.cadence}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{plan.label}</h3>
            <p className="text-sm text-slate-800">{plan.description}</p>
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
                {loadingPlan === plan.priceIdEnv
                  ? "Redirecting..."
                  : isAuthenticated
                  ? "Upgrade now"
                  : "Login to purchase"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
