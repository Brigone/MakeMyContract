import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripeClient } from "@/lib/stripe";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { requireAuthenticatedUser } from "@/lib/auth";

export const runtime = "nodejs";

const schema = z.object({
  plan: z.enum([
    "NEXT_PUBLIC_STRIPE_PRICE_WEEKLY",
    "NEXT_PUBLIC_STRIPE_PRICE_MONTHLY",
    "NEXT_PUBLIC_STRIPE_PRICE_YEARLY",
  ]).optional(),
  priceId: z.string().optional(),
  userId: z.string().optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe keys missing. Populate STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  try {
    const user = await requireAuthenticatedUser();
    const payload = schema.parse(await req.json());
    const priceId =
      payload.priceId ??
      (payload.plan ? process.env[payload.plan] : null);

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing Stripe price id" },
        { status: 400 }
      );
    }

    const isSubscription =
      priceId === env.stripe.priceIds.weekly ||
      priceId === env.stripe.priceIds.monthly ||
      priceId === env.stripe.priceIds.yearly;
    if (!isSubscription) {
      return NextResponse.json(
        { error: "Unsupported price id" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url:
        payload.successUrl ?? `${env.appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: payload.cancelUrl ?? `${env.appUrl}/pricing`,
      metadata: { userId: user.uid },
      customer_email: user.email ?? undefined,
      subscription_data: {
        metadata: { userId: user.uid },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url }, { status: 201 });
  } catch (error) {
    logger.error("Stripe checkout error", {
      error: error instanceof Error ? error.message : "unknown",
    });
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid payload", details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
