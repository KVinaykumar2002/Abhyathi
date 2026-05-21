import { API_BASE } from "@/lib/apiBase";

/** Resolve product image for <img src> (GridFS path or full URL). */
export function productImageSrc(image) {
  if (!image) return "";
  if (image.startsWith("http") || image.startsWith("data:")) {
    return image;
  }
  if (image.startsWith("/")) {
    return `${API_BASE}${image}`;
  }
  return image;
}
