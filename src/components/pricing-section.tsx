"use client";

import { useState } from "react";
import { PLAN_CONFIG, type PlanTier } from "@/lib/plans";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  isAuthenticated: boolean;
}

const defaultPlanId = (PLAN_CONFIG.find((plan) => plan.id === "monthly") ?? PLAN_CONFIG[0]).id as PlanTier;

export function PricingSection({ isAuthenticated }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(defaultPlanId);
  const [loading, setLoading] = useState(false);

  const activePlan = PLAN_CONFIG.find((plan) => plan.id === selectedPlan);

  const handleCheckout = async () => {
    if (!activePlan) {
      return;
    }
    if (!isAuthenticated) {
      window.location.href = "/signup";
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: activePlan.priceIdEnv }),
      });
      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!response.ok) {
        throw new Error("Checkout is temporarily unavailable. Please try again in a moment.");
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Checkout is temporarily unavailable. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid gap-3 sm:grid-cols-3">
        {PLAN_CONFIG.map((plan) => {
          const isActive = plan.id === selectedPlan;
          return (
            <button
              key={plan.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedPlan(plan.id as PlanTier)}
              className={`rounded-2xl border p-4 text-left transition ${
                isActive
                  ? "border-blue-400 bg-blue-50 shadow-[0_10px_40px_rgba(37,99,235,0.2)]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>{plan.cadence}</span>
                {isActive && <span className="text-blue-700">Selected</span>}
              </div>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{plan.price}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{plan.label}</h3>
              <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                {plan.perks.slice(0, 3).map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Selected plan: <span className="font-semibold text-slate-900">{activePlan ? activePlan.label : "None"}</span>
        </p>
        <Button
          type="button"
          size="lg"
          className="w-full rounded-2xl py-5 text-base font-semibold sm:w-fit sm:px-10"
          disabled={loading || !activePlan}
          onClick={handleCheckout}
        >
          {loading ? "Processing..." : "Buy Now"}
        </Button>
      </div>
    </div>
  );
}
