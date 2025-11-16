import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/lib/auth";

const SESSION_COOKIE = "mmc_session";

const buildCookieOptions = (req: NextRequest) => ({
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
  secure: process.env.NODE_ENV === "production",
  maxAge: 0,
  expires: new Date(0),
  path: "/",
  domain: process.env.SESSION_COOKIE_DOMAIN ?? req.nextUrl.hostname,
});

export async function POST(req: NextRequest) {
  await logout();
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    ...buildCookieOptions(req),
  });
  return response;
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
