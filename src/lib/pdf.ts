import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { ContractRecord } from "@/types/contracts";

const paragraphize = (content: string) =>
  content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      text: line,
      style: line === line.toUpperCase() && line.length < 60 ? "sectionTitle" : "paragraph",
      margin: line === line.toUpperCase() && line.length < 60 ? [0, 18, 0, 6] : [0, 4, 0, 4],
    }));

export const buildPdfDefinition = (contract: ContractRecord): TDocumentDefinitions => {
  const generatedAt = new Date(contract.createdAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return {
    info: {
      title: contract.title,
      author: "MakeMyRental",
      subject: contract.contractType,
    },
    header: {
      text: contract.title,
      alignment: "center",
      margin: [0, 20, 0, 0],
      color: "#475467",
      fontSize: 10,
    },
    footer: (currentPage: number, pageCount: number) => ({
      text: `Page ${currentPage} of ${pageCount}`,
      alignment: "center",
      margin: [0, 0, 0, 30],
      fontSize: 9,
      color: "#94a3b8",
    }),
    content: [
      {
        text: contract.title,
        style: "documentTitle",
        margin: [0, 0, 0, 6],
      },
      {
        text: `Generated ${generatedAt}`,
        style: "subheader",
      },
      ...paragraphize(contract.content),
    ],
    styles: {
      documentTitle: {
        fontSize: 20,
        bold: true,
        color: "#0f172a",
      },
      subheader: {
        fontSize: 10,
        color: "#475467",
      },
      sectionTitle: {
        fontSize: 12,
        bold: true,
        color: "#0f172a",
        letterSpacing: 0.5,
      },
      paragraph: {
        fontSize: 11,
        lineHeight: 1.45,
        color: "#111827",
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
    pageMargins: [60, 80, 60, 80],
  };
};
