/** Max upload size before base64 encoding (~3 MB file → ~4 MB data URL). */
export const IMAGE_MAX_BYTES = 3 * 1024 * 1024;

export function bufferToDataUrl(buffer, mimeType = "image/jpeg") {
  if (buffer.length > IMAGE_MAX_BYTES) {
    throw new Error(
      `Image too large (max ${Math.round(IMAGE_MAX_BYTES / 1024 / 1024)} MB)`
    );
  }
  const base64 = buffer.toString("base64");
  return `data:${mimeType};base64,${base64}`;
}

export async function fetchUrlToDataUrl(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${url} (${res.status})`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  if (!contentType.startsWith("image/")) {
    throw new Error("URL did not return an image");
  }
  return bufferToDataUrl(buffer, contentType);
}

export function isDataImageUrl(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}
