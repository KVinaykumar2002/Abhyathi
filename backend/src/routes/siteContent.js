import { Router } from "express";
import { getOrCreateSiteContent } from "../lib/getSiteContent.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const siteContent = await getOrCreateSiteContent();
    res.json({ siteContent });
  } catch (err) {
    next(err);
  }
});

export default router;
