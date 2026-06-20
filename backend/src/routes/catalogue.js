import { Router } from "express";
import mongoose from "mongoose";
import { openCataloguePdfDownloadStream } from "../lib/gridfs.js";
import { getOrCreateSiteContent } from "../lib/getSiteContent.js";

const router = Router();

/** GET /api/catalogue/pdf — stream uploaded catalogue PDF from GridFS */
router.get("/pdf", async (_req, res, next) => {
  try {
    const siteContent = await getOrCreateSiteContent();
    const fileId = siteContent.cataloguePdf?.fileId;

    if (!fileId || !mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(404).json({ message: "Catalogue PDF not found" });
    }

    const originalName = siteContent.cataloguePdf?.originalName || "catalogue.pdf";
    const safeName = originalName.replace(/[^\w.\-() ]+/g, "_");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${safeName}"`);

    const stream = openCataloguePdfDownloadStream(new mongoose.Types.ObjectId(fileId));
    stream.on("error", (err) => {
      if (err.code === "ENOENT") {
        return res.status(404).json({ message: "Catalogue PDF not found" });
      }
      next(err);
    });
    stream.pipe(res);
  } catch (err) {
    next(err);
  }
});

export default router;
