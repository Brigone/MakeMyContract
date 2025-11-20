import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { requireActiveSubscription } from "@/lib/auth";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

const buildInstruction = () => `You are Make My Contract, a professional contract drafting assistant.
Return a complete contract as plain text with clear sections such as Title, Parties, Term, Services, Payment, Termination, Confidentiality, Governing Law, Signature Blocks, and any other relevant clauses.
Requirements:
- No markdown, code fences, bullet emojis, or numbered formatting outside of the legal text itself.
- Use all caps for section headings (e.g., PAYMENT TERMS) and paragraphs separated by blank lines.
- Keep tone professional, concise, and enforceable in the United States.
- Always include signature lines at the bottom.`;

export async function POST(request: Request) {
  await requireActiveSubscription();

  try {
    const body = await request.json().catch(() => ({}));
    const prompt: string = (body?.prompt ?? "").toString().trim();
    const refine: string = (body?.refine ?? "").toString().trim();
    const existingContract: string = (body?.existingContract ?? "").toString().trim();

    if (!prompt && !existingContract) {
      return NextResponse.json({ error: "Please describe what you need." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logger.error("Gemini API key missing");
      return NextResponse.json({ error: "AI drafting is unavailable right now." }, { status: 503 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-pro" });

    const instruction = buildInstruction();
    const userRequest = existingContract
      ? `Existing contract:\n${existingContract}\n\nRefinement request: ${refine || "Improve clarity and completeness."}`
      : `User prompt: ${prompt}`;

    const result = await model.generateContent([instruction, userRequest]);
    const text = result.response?.text()?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "We couldn't generate your contract. Try a more specific prompt." },
        { status: 502 }
      );
    }

    return NextResponse.json({ contract: text });
  } catch (error) {
    logger.error("Gemini generation failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "We couldn't generate your contract. Try again in a moment." },
      { status: 500 }
    );
  }
}
