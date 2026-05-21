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
    /** Public URL or /api/media/:id when stored in GridFS */
    image: { type: String, required: true, trim: true },
    /** MongoDB GridFS file id when image binary is stored in DB */
    imageFileId: { type: mongoose.Schema.Types.ObjectId, default: null },
    soldOut: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  virtuals: true,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    if (ret.imageFileId) {
      ret.image = `/api/media/${ret.imageFileId}`;
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Product = mongoose.model("Product", productSchema);
