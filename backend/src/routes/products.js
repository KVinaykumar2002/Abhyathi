import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

/** GET /api/products — list products (optional ?category=) */
router.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    const data = products.map((p) => ({
      ...p,
      id: p._id.toString(),
      _id: undefined,
      __v: undefined,
    }));
    res.json({ products: data });
  } catch (err) {
    next(err);
  }
});

/** GET /api/products/:id */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
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

export default router;
