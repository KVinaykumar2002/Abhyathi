import { Router } from "express";
import multer from "multer";
import { Product, DEFAULT_PRODUCT_CATEGORIES } from "../models/Product.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { formatProduct } from "../lib/formatProduct.js";
import {
  CATALOGUE_PDF_MAX_BYTES,
  deleteCataloguePdfFile,
  deleteImageFile,
  uploadCataloguePdfBuffer,
} from "../lib/gridfs.js";
import { SiteContent } from "../models/SiteContent.js";
import { DEFAULT_SITE_CONTENT } from "../lib/defaultSiteContent.js";
import { getOrCreateSiteContent } from "../lib/getSiteContent.js";
import {
  bufferToDataUrl,
  fetchUrlToDataUrl,
  isDataImageUrl,
  IMAGE_MAX_BYTES,
} from "../lib/imageBase64.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: IMAGE_MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

const pdfUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: CATALOGUE_PDF_MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

router.use(requireAdmin);

function normalizeSlides(slides = []) {
  if (!Array.isArray(slides)) return [];
  return slides
    .map((slide, index) => ({
      type: slide?.type === "video" ? "video" : "image",
      mediaUrl: String(slide?.mediaUrl ?? "").trim(),
      title: String(slide?.title ?? "").trim(),
      subtitle: String(slide?.subtitle ?? "").trim(),
      ctaText: String(slide?.ctaText ?? "").trim(),
      ctaHref: String(slide?.ctaHref ?? "").trim(),
      order: Number.isFinite(Number(slide?.order)) ? Number(slide.order) : index,
      isActive: slide?.isActive !== false,
    }))
    .filter((slide) => slide.mediaUrl);
}

function normalizeSocialLinks(links = []) {
  if (!Array.isArray(links)) return [];
  return links
    .map((item) => ({
      platform: String(item?.platform ?? "").trim(),
      url: String(item?.url ?? "").trim(),
    }))
    .filter((item) => item.platform && item.url);
}

function normalizeStoreEntries(entries = []) {
  if (!Array.isArray(entries)) return [];
  return entries
    .map((entry) => ({
      name: String(entry?.name ?? "").trim(),
      address: String(entry?.address ?? "").trim(),
      phone: String(entry?.phone ?? "").trim(),
      hours: String(entry?.hours ?? "").trim(),
      image: String(entry?.image ?? "").trim(),
      googleMapsUrl: String(entry?.googleMapsUrl ?? "").trim(),
    }))
    .filter((entry) => entry.name);
}

function normalizeTestimonials(entries = []) {
  if (!Array.isArray(entries)) return [];
  return entries
    .map((item) => ({
      name: String(item?.name ?? "").trim(),
      role: String(item?.role ?? "").trim(),
      quote: String(item?.quote ?? "").trim(),
      image: String(item?.image ?? "").trim(),
    }))
    .filter((item) => item.name && item.quote);
}

function normalizeTestimonialStats(stats = {}) {
  const customers = Number(stats?.customers ?? stats?.clients);
  const products = Number(stats?.products ?? stats?.projects);
  const rating = Number(stats?.rating);
  return {
    customers: Number.isFinite(customers) && customers >= 0 ? Math.round(customers) : 5000,
    products: Number.isFinite(products) && products >= 0 ? Math.round(products) : 1500,
    rating:
      Number.isFinite(rating) && rating >= 0
        ? Math.min(5, Math.max(0, Math.round(rating * 10) / 10))
        : 5,
  };
}

function normalizeProductCategories(categories = []) {
  if (!Array.isArray(categories)) return [...DEFAULT_PRODUCT_CATEGORIES];
  const seen = new Set();
  const normalized = [];
  for (const item of categories) {
    const name = String(item ?? "").trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(name);
  }
  return normalized;
}

function normalizeSiteContentPayload(payload = {}) {
  return {
    homeSlides: normalizeSlides(payload.homeSlides),
    productSlides: normalizeSlides(payload.productSlides),
    about: {
      ...DEFAULT_SITE_CONTENT.about,
      ...(payload.about ?? {}),
    },
    contact: {
      ...DEFAULT_SITE_CONTENT.contact,
      ...(payload.contact ?? {}),
    },
    socialLinks: normalizeSocialLinks(payload.socialLinks),
    testimonials: normalizeTestimonials(payload.testimonials),
    testimonialStats: {
      ...DEFAULT_SITE_CONTENT.testimonialStats,
      ...normalizeTestimonialStats(payload.testimonialStats),
    },
    productCategories: normalizeProductCategories(
      payload.productCategories ?? DEFAULT_SITE_CONTENT.productCategories
    ),
    stores: {
      ...DEFAULT_SITE_CONTENT.stores,
      ...(payload.stores ?? {}),
      entries: normalizeStoreEntries(payload?.stores?.entries),
    },
  };
}

function parseProductFields(body) {
  const { name, price, category, description, image, soldOut } = body;
  return {
    name: name?.trim(),
    price: price !== undefined && price !== "" ? Number(price) : undefined,
    category: category?.trim?.() ?? category,
    description: description?.trim(),
    image: image?.trim(),
    soldOut: soldOut === true || soldOut === "true",
  };
}

async function getAllowedProductCategories() {
  const content = await getOrCreateSiteContent();
  const cats = Array.isArray(content.productCategories)
    ? content.productCategories.map((c) => String(c).trim()).filter(Boolean)
    : [];
  return cats.length > 0 ? cats : [...DEFAULT_PRODUCT_CATEGORIES];
}

function validateProduct(data, { partial = false, requireImage = true, categories = [] } = {}) {
  const errors = [];
  if (!partial || data.name !== undefined) {
    if (!data.name) errors.push("name is required");
  }
  if (!partial || data.price !== undefined) {
    if (data.price === undefined || Number.isNaN(data.price) || data.price < 0) {
      errors.push("price must be a non-negative number");
    }
  }
  if (!partial || data.category !== undefined) {
    if (!data.category) {
      errors.push("category is required");
    } else if (categories.length > 0 && !categories.includes(data.category)) {
      errors.push(`category must be one of: ${categories.join(", ")}`);
    }
  }
  if (!partial || data.description !== undefined) {
    if (!data.description) errors.push("description is required");
  }
  if (requireImage && (!partial || data.image !== undefined)) {
    if (!data.image) errors.push("image URL or image file is required");
  }
  return errors;
}

async function resolveImage({ file, imageUrl }) {
  if (file) {
    return {
      image: bufferToDataUrl(file.buffer, file.mimetype),
      imageFileId: null,
    };
  }
  if (imageUrl) {
    if (isDataImageUrl(imageUrl)) {
      return { image: imageUrl, imageFileId: null };
    }
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return {
        image: await fetchUrlToDataUrl(imageUrl),
        imageFileId: null,
      };
    }
    return { image: imageUrl, imageFileId: null };
  }
  return null;
}

/** POST /api/admin/products — create product (JSON or multipart with imageFile) */
router.post("/products", upload.single("imageFile"), async (req, res, next) => {
  try {
    const data = parseProductFields(req.body);
    const imageMeta = await resolveImage({
      file: req.file,
      imageUrl: data.image,
    });
    const categories = await getAllowedProductCategories();

    const errors = validateProduct(
      { ...data, image: imageMeta?.image },
      { requireImage: !imageMeta, categories }
    );
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const product = await Product.create({
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      soldOut: data.soldOut,
      image: imageMeta.image,
      imageFileId: imageMeta.imageFileId,
    });

    res.status(201).json({ product: formatProduct(product) });
  } catch (err) {
    next(err);
  }
});

/** PUT /api/admin/products/:id */
router.put("/products/:id", upload.single("imageFile"), async (req, res, next) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    const data = parseProductFields(req.body);
    const imageMeta = await resolveImage({
      file: req.file,
      imageUrl: data.image,
    });
    const categories = await getAllowedProductCategories();

    const errors = validateProduct(data, {
      partial: true,
      requireImage: false,
      categories,
    });
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );

    if (imageMeta) {
      if (existing.imageFileId) {
        await deleteImageFile(existing.imageFileId);
      }
      updates.image = imageMeta.image;
      updates.imageFileId = null;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ product: formatProduct(product) });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid product id" });
    }
    next(err);
  }
});

/** DELETE /api/admin/products/:id */
router.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.imageFileId) {
      await deleteImageFile(product.imageFileId);
    }
    res.json({ message: "Product deleted", id: req.params.id });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid product id" });
    }
    next(err);
  }
});

/** POST /api/admin/catalogue-pdf — upload or replace catalogue PDF */
router.post("/catalogue-pdf", pdfUpload.single("pdfFile"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const siteContent = await getOrCreateSiteContent();
    const previousFileId = siteContent.cataloguePdf?.fileId;

    const fileId = await uploadCataloguePdfBuffer(
      req.file.buffer,
      req.file.originalname || "catalogue.pdf",
      req.file.mimetype
    );

    const updated = await SiteContent.findByIdAndUpdate(
      siteContent._id,
      {
        cataloguePdf: {
          fileId,
          originalName: req.file.originalname || "catalogue.pdf",
          uploadedAt: new Date(),
        },
      },
      { new: true, runValidators: true }
    );

    if (previousFileId) {
      await deleteCataloguePdfFile(previousFileId);
    }

    res.json({ siteContent: updated });
  } catch (err) {
    next(err);
  }
});

/** DELETE /api/admin/catalogue-pdf — remove catalogue PDF */
router.delete("/catalogue-pdf", async (_req, res, next) => {
  try {
    const siteContent = await getOrCreateSiteContent();
    const previousFileId = siteContent.cataloguePdf?.fileId;

    if (!previousFileId) {
      return res.status(404).json({ message: "No catalogue PDF to remove" });
    }

    await deleteCataloguePdfFile(previousFileId);

    const updated = await SiteContent.findByIdAndUpdate(
      siteContent._id,
      {
        cataloguePdf: {
          fileId: null,
          originalName: "",
          uploadedAt: null,
        },
      },
      { new: true, runValidators: true }
    );

    res.json({ siteContent: updated });
  } catch (err) {
    next(err);
  }
});

/** GET /api/admin/site-content */
router.get("/site-content", async (_req, res, next) => {
  try {
    const siteContent = await getOrCreateSiteContent();
    res.json({ siteContent });
  } catch (err) {
    next(err);
  }
});

/** PUT /api/admin/site-content */
router.put("/site-content", async (req, res, next) => {
  try {
    const payload = normalizeSiteContentPayload(req.body?.siteContent ?? req.body ?? {});
    const existing = await SiteContent.findOne();
    const siteContent = existing
      ? await SiteContent.findByIdAndUpdate(existing._id, payload, {
          new: true,
          runValidators: true,
        })
      : await SiteContent.create(payload);
    res.json({ siteContent });
  } catch (err) {
    next(err);
  }
});

export default router;
