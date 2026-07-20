import { createWorker } from "tesseract.js";

/**
 *
 * @param {string} b64DataUrl
 * @returns
 */
export async function readCanvasContent(b64DataUrl: string): Promise<string> {
  const imageBuffer = Buffer.from(
    b64DataUrl.replace(/^data:image\/\w+;base64,/, ""),
    "base64",
  );

  const worker = await createWorker("eng");

  try {
    const {
      data: { text },
    } = await worker.recognize(imageBuffer);
    return text;
  } finally {
    await worker.terminate();
  }
}
