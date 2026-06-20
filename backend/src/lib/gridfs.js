import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const BUCKET_NAME = "productImages";
const CATALOGUE_BUCKET_NAME = "cataloguePdfs";

export const CATALOGUE_PDF_MAX_BYTES = 50 * 1024 * 1024;

export function getImageBucket() {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database not connected");
  }
  return new GridFSBucket(db, { bucketName: BUCKET_NAME });
}

export function mediaPath(fileId) {
  return `/api/media/${fileId}`;
}

export async function uploadImageBuffer(buffer, filename, contentType = "image/jpeg") {
  const bucket = getImageBucket();
  return new Promise((resolve, reject) => {
    const stream = bucket.openUploadStream(filename, {
      contentType,
      metadata: { uploadedAt: new Date() },
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve(stream.id));
    stream.end(buffer);
  });
}

export async function uploadImageFromUrl(url, filename) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${url} (${res.status})`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  return uploadImageBuffer(buffer, filename, contentType);
}

export async function deleteImageFile(fileId) {
  if (!fileId) return;
  const bucket = getImageBucket();
  try {
    await bucket.delete(fileId);
  } catch {
    // File may already be removed
  }
}

export async function clearAllProductImages() {
  const bucket = getImageBucket();
  const files = await bucket.find({}).toArray();
  await Promise.all(files.map((f) => bucket.delete(f._id)));
}

export function openImageDownloadStream(fileId) {
  const bucket = getImageBucket();
  return bucket.openDownloadStream(fileId);
}

export function getCataloguePdfBucket() {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database not connected");
  }
  return new GridFSBucket(db, { bucketName: CATALOGUE_BUCKET_NAME });
}

export async function uploadCataloguePdfBuffer(buffer, filename, contentType = "application/pdf") {
  const bucket = getCataloguePdfBucket();
  return new Promise((resolve, reject) => {
    const stream = bucket.openUploadStream(filename, {
      contentType,
      metadata: { uploadedAt: new Date() },
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve(stream.id));
    stream.end(buffer);
  });
}

export async function deleteCataloguePdfFile(fileId) {
  if (!fileId) return;
  const bucket = getCataloguePdfBucket();
  try {
    await bucket.delete(fileId);
  } catch {
    // File may already be removed
  }
}

export function openCataloguePdfDownloadStream(fileId) {
  const bucket = getCataloguePdfBucket();
  return bucket.openDownloadStream(fileId);
}
