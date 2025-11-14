import type Stripe from "stripe";

declare module "stripe" {
  namespace Stripe {
    interface Invoice {
      subscription?: string | Stripe.Subscription | null;
      metadata: Stripe.Metadata;
    }

    interface InvoiceLineItem {
      price?: Stripe.Price | null;
      period?: {
        start?: number | null;
        end?: number | null;
      };
    }

    interface Subscription {
      current_period_end?: number | null;
      current_period_start?: number | null;
    }
  }
}
