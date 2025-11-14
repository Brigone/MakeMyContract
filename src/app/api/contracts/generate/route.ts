import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { type ContractFormPayload } from "@/types/contracts";
import { generateContractFromTemplate } from "@/lib/contracts-engine";
import { saveContractRecord } from "@/lib/firestore";
import { logger } from "@/lib/logger";
import { requireActiveSubscription } from "@/lib/auth";
import { contractFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const user = await requireActiveSubscription();
    const body = await req.json();
    const payload = contractFormSchema.parse(body) as ContractFormPayload;
    const output = generateContractFromTemplate(
      payload.contractType,
      payload
    );
    const record = await saveContractRecord({
      userId: user.uid,
      contractType: payload.contractType,
      formData: payload,
      content: output.content,
      title: output.title,
    });
    return NextResponse.json(
      {
        contractId: record.id,
        title: record.title,
        content: record.content,
        createdAt: record.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Contract generation error", {
      error:
        error instanceof Error ? error.message : "Unknown server error",
    });
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid payload", details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Unable to generate contract" },
      { status: 500 }
    );
  }
}
