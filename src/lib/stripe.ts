import Stripe from "stripe";
import { env } from "@/lib/env";

let stripeClient: Stripe | null = null;

export const getStripeClient = () => {
  if (!env.stripe.secretKey) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(env.stripe.secretKey, {
      apiVersion: "2025-10-29.clover",
    });
  }
  return stripeClient;
};
