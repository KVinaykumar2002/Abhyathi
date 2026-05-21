import { mediaPath } from "./gridfs.js";

/** Normalize product document for API responses. */
export function formatProduct(doc) {
  if (!doc) return doc;
  const ret = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };
  ret.id = ret._id?.toString() ?? ret.id;
  delete ret._id;
  delete ret.__v;

  if (ret.imageFileId) {
    ret.image = mediaPath(ret.imageFileId.toString());
  }

  return ret;
}
