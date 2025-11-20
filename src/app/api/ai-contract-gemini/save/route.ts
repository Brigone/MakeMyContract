import { NextResponse } from "next/server";
import { requireActiveSubscription } from "@/lib/auth";
import { saveAiDraftRecord } from "@/lib/firestore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await requireActiveSubscription();
  try {
    const body = await request.json().catch(() => ({}));
    const prompt = (body?.prompt ?? "").toString().trim();
    const output = (body?.output ?? "").toString().trim();

    if (!prompt || !output) {
      return NextResponse.json({ error: "Prompt and output are required." }, { status: 400 });
    }

    const record = await saveAiDraftRecord({
      userId: user.uid,
      prompt,
      output,
      source: "gemini",
    });

    return NextResponse.json({ draft: record });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to save your draft. Try again." },
      { status: 500 }
    );
  }
}
