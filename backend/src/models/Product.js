import mongoose from "mongoose";

export const PRODUCT_CATEGORIES = [
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
      enum: PRODUCT_CATEGORIES,
    },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    soldOut: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  virtuals: true,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Product = mongoose.model("Product", productSchema);
