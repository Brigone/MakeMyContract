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
    description: "Ideal for deal-heavy weeks when you need nonstop contract access.",
    priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_WEEKLY",
    perks: [
      "Unlimited contracts for 7 days",
      "Full dashboard history and PDFs",
      "Perfect for short sprints or trials",
    ],
  },
  {
    id: "monthly",
    label: "Unlimited Monthly",
    price: "$19",
    cadence: "per month",
    description: "Perfect for founders who generate contracts every week.",
    priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_MONTHLY",
    perks: [
      "Unlimited agreements every month",
      "Dashboard storage and resend links",
      "Priority support when you need edits",
    ],
  },
  {
    id: "annual",
    label: "Unlimited Annual",
    price: "$99",
    cadence: "per year",
    description: "Best value for teams and power users who live in contracts.",
    priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_YEARLY",
    perks: [
      "Unlimited contracts all year long",
      "Seat-friendly for collaborators",
      "Annual invoice and receipts",
      "VIP access to new templates",
    ],
  },
];
