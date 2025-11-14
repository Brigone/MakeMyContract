import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";
import { env } from "@/lib/env";
import { recordPaymentHistory, updateUserPlan } from "@/lib/firestore";
import { getServerFirestore } from "@/lib/firebase/server";
import { logger } from "@/lib/logger";
import type { SubscriptionPlan } from "@/types/contracts";

export const runtime = "nodejs";
export const preferredRegion = "iad1";

const toISO = (unix?: number | null) =>
  unix ? new Date(unix * 1000).toISOString() : undefined;

const resolvePlanFromPrice = (priceId?: string | null): SubscriptionPlan => {
  if (!priceId) return null;
  if (priceId === env.stripe.priceIds.weekly) return "weekly";
  if (priceId === env.stripe.priceIds.monthly) return "monthly";
  if (priceId === env.stripe.priceIds.yearly) return "annual";
  return null;
};

const resolveUserIdByEmail = async (email?: string | null) => {
  if (!email) return null;
  try {
    const db = getServerFirestore();
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].id;
  } catch (error) {
    logger.error("Unable to resolve userId from email", {
      email,
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
};

export async function POST(req: NextRequest) {
  logger.info("[WEBHOOK] POST received");

  const stripe = getStripeClient();
  if (!stripe || !env.stripe.webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret missing" },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  logger.info("[WEBHOOK] Signature header", { signature });
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = Buffer.from(await req.arrayBuffer());
  logger.info("[WEBHOOK] Raw body length", { length: rawBody.length });

  let event: Stripe.Event;
  try {
    logger.info("[WEBHOOK] Constructing event...");
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      env.stripe.webhookSecret
    );
    logger.info("[WEBHOOK] Event constructed", { eventType: event.type });
  } catch (err) {
    logger.error("Stripe signature verification failed", {
      error: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "invoice.paid") {
    logger.info("[WEBHOOK] Ignored event", { eventType: event.type });
    return NextResponse.json({ skipped: true }, { status: 200 });
  }

  const invoice = event.data.object as Stripe.Invoice;
  logger.info("[WEBHOOK] Resolving userId by email", { email: invoice.customer_email });
  const userId = await resolveUserIdByEmail(invoice.customer_email);
  logger.info("[WEBHOOK] Resolved userId", { userId });

  if (!userId) {
    logger.warn("Invoice paid without matching Firebase user", {
      invoiceId: invoice.id,
      customerEmail: invoice.customer_email,
    });
    return NextResponse.json({ skipped: true }, { status: 200 });
  }

  const priceId = invoice.lines.data[0]?.pricing?.price_details?.price ?? null;
  logger.info("[WEBHOOK] Resolving plan", { priceId });
  const plan = resolvePlanFromPrice(priceId) ?? "expired";
  logger.info("[WEBHOOK] Resolved plan", { plan });
  const subscriptionId =
    typeof invoice.subscription === "string"
      ? invoice.subscription
      : invoice.subscription?.id ?? null;
  const currentPeriodEnd = toISO(invoice.lines.data[0]?.period?.end);
  const periodStart = toISO(invoice.lines.data[0]?.period?.start);
  const paidAt = toISO(invoice.status_transitions?.paid_at ?? invoice.created);

  logger.info("[WEBHOOK] Updating user plan", {
    userId,
    plan,
    subscriptionId,
    currentPeriodEnd,
    periodStart,
    paidAt
  });
  await updateUserPlan({
    userId,
    plan,
    planStatus: "active",
    subscriptionId: subscriptionId ?? null,
    currentPeriodEnd: currentPeriodEnd ?? null,
    nextBillingDate: currentPeriodEnd ?? null,
    lastPaymentAt: paidAt ?? null,
    lastInvoiceId: invoice.id,
    cancelledAt: null,
    cancellationReason: null,
  });
  logger.info("[WEBHOOK] User plan updated successfully");

  logger.info("[WEBHOOK] Recording payment history", { invoiceId: invoice.id });
  await recordPaymentHistory({
    userId,
    invoiceId: invoice.id,
    amount: (invoice.amount_paid ?? 0) / 100,
    currency: invoice.currency ?? "usd",
    status: "paid",
    paidAt: paidAt ?? new Date().toISOString(),
    subscriptionId,
    plan,
    periodStart,
    periodEnd: currentPeriodEnd,
  });
  logger.info("[WEBHOOK] Payment history recorded");

  logger.info("[WEBHOOK] Returning success response");
  return NextResponse.json({ received: true }, { status: 200 });
}
