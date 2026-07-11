import { SiteContent } from "../models/SiteContent.js";
import { DEFAULT_SITE_CONTENT } from "./defaultSiteContent.js";

export async function getOrCreateSiteContent() {
  let content = await SiteContent.findOne();
  if (!content) {
    content = await SiteContent.create(DEFAULT_SITE_CONTENT);
    return content;
  }

  // Backfill categories for older documents
  if (!Array.isArray(content.productCategories) || content.productCategories.length === 0) {
    content.productCategories = [...DEFAULT_SITE_CONTENT.productCategories];
    await content.save();
  }

  return content;
}
