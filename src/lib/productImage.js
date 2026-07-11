import { API_BASE } from "@/lib/apiBase";

/** Resolve image for <img src> (base64, http URL, frontend public path, or /api media). */
export function productImageSrc(image) {
  if (!image) return "";
  if (image.startsWith("data:") || image.startsWith("http")) {
    return image;
  }
  // Backend-hosted media only — keep Vite public assets like /image.png as-is
  if (image.startsWith("/api/")) {
    return `${API_BASE}${image}`;
  }
  if (image.startsWith("/")) {
    return image;
  }
  return image;
}
