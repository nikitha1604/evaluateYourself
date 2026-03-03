import Tesseract from "tesseract.js";

export async function parseImage(buffer) {
  const { data } = await Tesseract.recognize(buffer, "eng"); // add more langs if needed
  return (data.text || "").trim();
}
