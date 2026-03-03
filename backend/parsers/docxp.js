import mammoth from "mammoth";

export async function parseDocx(buffer) {
  const { value } = await mammoth.extractRawText({ buffer });
  return (value || "").trim();
}
