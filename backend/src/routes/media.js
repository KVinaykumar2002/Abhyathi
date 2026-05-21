import { Router } from "express";
import mongoose from "mongoose";
import { openImageDownloadStream } from "../lib/gridfs.js";

const router = Router();

/** GET /api/media/:fileId — stream product image from MongoDB GridFS */
router.get("/:fileId", async (req, res, next) => {
  try {
    const { fileId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid image id" });
    }

    const stream = openImageDownloadStream(new mongoose.Types.ObjectId(fileId));
    stream.on("error", (err) => {
      if (err.code === "ENOENT") {
        return res.status(404).json({ message: "Image not found" });
      }
      next(err);
    });
    stream.pipe(res);
  } catch (err) {
    next(err);
  }
});

export default router;
