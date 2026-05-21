import { API_BASE } from "@/lib/apiBase";

/** Resolve product image for <img src> (base64 data URL, http URL, or legacy /api/media). */
export function productImageSrc(image) {
  if (!image) return "";
  if (image.startsWith("data:") || image.startsWith("http")) {
    return image;
  }
  if (image.startsWith("/")) {
    return `${API_BASE}${image}`;
  }
  return image;
}
