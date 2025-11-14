import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminAuth } from "@/lib/firebase/server";
import { getOrCreateUserProfile } from "@/lib/firestore";

const SESSION_COOKIE = "mmc_session";
const SESSION_EXPIRATION_MS = 1000 * 60 * 60 * 24 * 5; // 5 days


const buildCookieOptions = (req: NextRequest) => ({
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
  secure: process.env.NODE_ENV === "production",
  maxAge: Math.floor(SESSION_EXPIRATION_MS / 1000),
  path: "/",
  domain: process.env.SESSION_COOKIE_DOMAIN ?? req.nextUrl.hostname,
});

export async function POST(req: NextRequest) {
  const auth = getFirebaseAdminAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Firebase Admin is not configured" },
      { status: 500 }
    );
  }

  const { idToken } = await req.json();
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken, true);
    await getOrCreateUserProfile({
      userId: decoded.uid,
      email: decoded.email ?? "",
    });
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRATION_MS,
    });
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: SESSION_COOKIE,
      value: sessionCookie,
      ...buildCookieOptions(req),
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
    secure: process.env.NODE_ENV === "production",
    domain: process.env.SESSION_COOKIE_DOMAIN ?? req.nextUrl.hostname,
  });
  return response;
}
