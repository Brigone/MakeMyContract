import { NextResponse } from "next/server";
import { requireActiveSubscription } from "@/lib/auth";
import { buildPdfDefinitionFromText } from "@/lib/pdf";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function POST(request: Request) {
  await requireActiveSubscription();
  try {
    const body = await request.json().catch(() => ({}));
    const content = (body?.content ?? "").toString().trim();
    const title = (body?.title ?? "AI Draft").toString().trim() || "AI Draft";

    if (!content) {
      return NextResponse.json({ error: "Contract text is required." }, { status: 400 });
    }

    const docDefinition = buildPdfDefinitionFromText({ title, content });
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
    const buffer = await streamPromise;

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${title.replace(/[^a-z0-9-_]/gi, "_")}.pdf"`,
      },
    });
  } catch (error) {
    logger.error("AI PDF rendering failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Unable to generate the PDF right now." },
      { status: 500 }
    );
  }
}
