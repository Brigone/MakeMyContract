import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getFirebaseAdminAuth } from "@/lib/firebase/server";
import { getOrCreateUserProfile } from "@/lib/firestore";
import type { SubscriptionPlan, UserProfile } from "@/types/contracts";

const SESSION_COOKIE = "mmc_session";
const hasActivePlan = (plan: SubscriptionPlan | null) =>
  plan === "weekly" || plan === "monthly" || plan === "annual";
const isCurrentPeriodActive = (periodEnd?: string | null) => {
  if (!periodEnd) return false;
  const expiresAt = Date.parse(periodEnd);
  if (Number.isNaN(expiresAt)) return false;
  return expiresAt > Date.now();
};

const getSessionToken = () => {
  const store = cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
};

export interface AuthenticatedUser {
  uid: string;
  email: string;
  plan: SubscriptionPlan;
  profile: UserProfile;
}

export const getCurrentUser = async (): Promise<AuthenticatedUser | null> => {
  const token = getSessionToken();
  if (!token) return null;

  const auth = getFirebaseAdminAuth();
  if (!auth) {
    return null;
  }

  try {
    const decoded = await auth.verifySessionCookie(token, true);
    const profile = await getOrCreateUserProfile({
      userId: decoded.uid,
      email: decoded.email ?? "",
    });
    return {
      uid: decoded.uid,
      email: decoded.email ?? "",
      plan: profile.plan,
      profile,
    };
  } catch (error) {
    return null;
  }
};

export const requireAuthenticatedUser = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/pricing");
  }
  return user;
};

export const requireActiveSubscription = async () => {
  const user = await requireAuthenticatedUser();
  if (user.plan === "expired") {
    redirect("/paywall/expired");
  }
  if (!hasActivePlan(user.plan)) {
    redirect("/paywall/must-subscribe");
  }
  if (!isCurrentPeriodActive(user.profile.currentPeriodEnd)) {
    redirect("/paywall/expired");
  }
  return user;
};
