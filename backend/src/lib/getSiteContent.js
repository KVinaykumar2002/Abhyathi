import { SiteContent } from "../models/SiteContent.js";
import { DEFAULT_SITE_CONTENT } from "./defaultSiteContent.js";

export async function getOrCreateSiteContent() {
  let content = await SiteContent.findOne();
  if (!content) {
    content = await SiteContent.create(DEFAULT_SITE_CONTENT);
  }
  return content;
}
