/** Fallback when CMS has not configured categories yet. */
export const DEFAULT_PRODUCT_CATEGORIES = [
  "Containers",
  "Bags & Wraps",
  "Cups & Lids",
  "Eco-Friendly",
];

export function resolveProductCategories(siteContent) {
  const fromCms = (siteContent?.productCategories ?? [])
    .map((c) => String(c ?? "").trim())
    .filter(Boolean);
  return fromCms.length > 0 ? fromCms : [...DEFAULT_PRODUCT_CATEGORIES];
}
