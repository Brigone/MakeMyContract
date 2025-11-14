import { NextRequest, NextResponse } from "next/server";
import { getContractByIdForUser } from "@/lib/firestore";
import { buildPdfDefinition } from "@/lib/pdf";
import { logger } from "@/lib/logger";
import { requireActiveSubscription } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contractId = searchParams.get("contractId");

  if (!contractId) {
    return NextResponse.json(
      { error: "contractId query parameter is required" },
      { status: 400 }
    );
  }

  const user = await requireActiveSubscription();
  const contract = await getContractByIdForUser({
    userId: user.uid,
    contractId,
  });
  if (!contract) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const docDefinition = buildPdfDefinition(contract);
  const PdfPrinter = (await import("pdfmake")).default;
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts);
  const doc = printer.createPdfKitDocument(docDefinition);
  const chunks: Buffer[] = [];

  const streamPromise = new Promise<Buffer>((resolve, reject) => {
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", (err: Error) => reject(err));
  });

  doc.end();

  try {
    const buffer = await streamPromise;
    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${contract.title}.pdf"`,
      },
    });
  } catch (error) {
    logger.error("PDF rendering failed", {
      contractId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Failed to render PDF" },
      { status: 500 }
    );
  }
}
