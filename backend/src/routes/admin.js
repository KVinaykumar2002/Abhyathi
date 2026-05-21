import { Router } from "express";
import { Product, PRODUCT_CATEGORIES } from "../models/Product.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();
router.use(requireAdmin);

function parseProductBody(body) {
  const { name, price, category, description, image, soldOut } = body;
  return {
    name: name?.trim(),
    price: price !== undefined ? Number(price) : undefined,
    category,
    description: description?.trim(),
    image: image?.trim(),
    soldOut: soldOut === true || soldOut === "true",
  };
}

function validateProduct(data, { partial = false } = {}) {
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
  if (!partial || data.image !== undefined) {
    if (!data.image) errors.push("image URL is required");
  }
  return errors;
}

/** POST /api/admin/products — create product */
router.post("/products", async (req, res, next) => {
  try {
    const data = parseProductBody(req.body);
    const errors = validateProduct(data);
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const product = await Product.create(data);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
});

/** PUT /api/admin/products/:id */
router.put("/products/:id", async (req, res, next) => {
  try {
    const data = parseProductBody(req.body);
    const errors = validateProduct(data, { partial: true });
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
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
    res.json({ message: "Product deleted", id: req.params.id });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid product id" });
    }
    next(err);
  }
});

export default router;
