export type PlanTier = "weekly" | "monthly" | "annual";

export interface PlanConfig {
  id: PlanTier;
  label: string;
  price: string;
  cadence: string;
  description: string;
  priceIdEnv: string;
  perks: string[];
}

export const PLAN_CONFIG: PlanConfig[] = [
  {
    id: "weekly",
    label: "Unlimited Weekly",
    price: "$9",
    cadence: "per week",
    description: "Ideal for turnover-heavy weeks when you need nonstop rental paperwork.",
    priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_WEEKLY",
    perks: [
      "Unlimited rental forms for 7 days",
      "Full dashboard history and PDFs",
      "Perfect for onboarding bursts or trials",
    ],
  },
  {
    id: "monthly",
    label: "Unlimited Monthly",
    price: "$19",
    cadence: "per month",
    description: "Perfect for landlords and property managers who issue paperwork every week.",
    priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_MONTHLY",
    perks: [
      "Unlimited rental agreements every month",
      "Dashboard storage and resend links",
      "Priority support for complex clauses",
    ],
  },
  {
    id: "annual",
    label: "Unlimited Annual",
    price: "$99",
    cadence: "per year",
    description: "Best value for property teams and Airbnb hosts who live in rental paperwork.",
    priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_YEARLY",
    perks: [
      "Unlimited rental forms all year long",
      "Seat-friendly for collaborators",
      "Annual invoice and receipts",
      "VIP access to new rental templates",
    ],
  },
];
