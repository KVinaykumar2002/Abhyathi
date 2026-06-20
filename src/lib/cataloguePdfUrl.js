import { API_BASE } from "@/lib/apiBase";

const FALLBACK = "/Abhyati catlog (1).pdf";

export function cataloguePdfHref(siteContent) {
  if (siteContent?.cataloguePdf?.fileId) {
    return `${API_BASE}/api/catalogue/pdf`;
  }
  return FALLBACK;
}

export function hasUploadedCataloguePdf(siteContent) {
  return Boolean(siteContent?.cataloguePdf?.fileId);
}

export const CATALOGUE_PDF_FALLBACK = FALLBACK;
