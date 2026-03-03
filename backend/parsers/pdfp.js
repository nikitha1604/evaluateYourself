// backend/parsers/pdfp.js
import pdf from "pdf-parse/lib/pdf-parse.js";

console.log(">>> Using pdfp.js from:", import.meta.url);

export async function parsePdf(buffer) {
  const data = await pdf(buffer);
  return (data.text || "").trim();
}
