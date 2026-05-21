import { isDataImageUrl } from "./imageBase64.js";
import { mediaPath } from "./gridfs.js";

/** Image string for API / frontend (<img src>). Supports base64, URL, or legacy GridFS. */
export function productImageForApi(doc) {
  if (!doc) return "";
  const image = doc.image;
  if (isDataImageUrl(image) || image?.startsWith("http")) {
    return image;
  }
  if (doc.imageFileId) {
    return mediaPath(doc.imageFileId.toString());
  }
  return image || "";
}
