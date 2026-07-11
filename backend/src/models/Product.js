import mongoose from "mongoose";
import { productImageForApi } from "../lib/productImage.js";

/** Fallback defaults when site content has no categories yet. Not a fixed enum. */
export const DEFAULT_PRODUCT_CATEGORIES = [
  "Containers",
  "Bags & Wraps",
  "Cups & Lids",
  "Eco-Friendly",
];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    /** data:image/...;base64,... URL, http(s) URL, or legacy /api/media/:id */
    image: { type: String, required: true },
    /** @deprecated Legacy GridFS id — new uploads use base64 in `image` */
    imageFileId: { type: mongoose.Schema.Types.ObjectId, default: null },
    soldOut: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  virtuals: true,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    ret.image = productImageForApi(ret);
    delete ret.imageFileId;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Product = mongoose.model("Product", productSchema);
