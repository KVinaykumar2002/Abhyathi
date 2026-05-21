import { Router } from "express";
import multer from "multer";
import { Product, PRODUCT_CATEGORIES } from "../models/Product.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { formatProduct } from "../lib/formatProduct.js";
import { deleteImageFile } from "../lib/gridfs.js";
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

router.use(requireAdmin);

function parseProductFields(body) {
  const { name, price, category, description, image, soldOut } = body;
  return {
    name: name?.trim(),
    price: price !== undefined && price !== "" ? Number(price) : undefined,
    category,
    description: description?.trim(),
    image: image?.trim(),
    soldOut: soldOut === true || soldOut === "true",
  };
}

function validateProduct(data, { partial = false, requireImage = true } = {}) {
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
    if (!data.category || !PRODUCT_CATEGORIES.includes(data.category)) {
      errors.push(`category must be one of: ${PRODUCT_CATEGORIES.join(", ")}`);
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

    const errors = validateProduct(
      { ...data, image: imageMeta?.image },
      { requireImage: !imageMeta }
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

    const errors = validateProduct(data, {
      partial: true,
      requireImage: false,
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

export default router;
