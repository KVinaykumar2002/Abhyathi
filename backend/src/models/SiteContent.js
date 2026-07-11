import mongoose from "mongoose";

const slideSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
      default: "image",
    },
    mediaUrl: { type: String, required: true, trim: true },
    title: { type: String, trim: true, default: "" },
    subtitle: { type: String, trim: true, default: "" },
    ctaText: { type: String, trim: true, default: "" },
    ctaHref: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: true }
);

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: true }
);

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: "" },
    quote: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
  },
  { _id: true }
);

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    hours: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    googleMapsUrl: { type: String, trim: true, default: "" },
  },
  { _id: true }
);

const siteContentSchema = new mongoose.Schema(
  {
    homeSlides: { type: [slideSchema], default: [] },
    productSlides: { type: [slideSchema], default: [] },
    about: {
      heroTitle: { type: String, trim: true, default: "About Us" },
      visionTitle: { type: String, trim: true, default: "Our Vision" },
      visionText: { type: String, trim: true, default: "" },
      missionTitle: { type: String, trim: true, default: "Our Mission" },
      missionText: { type: String, trim: true, default: "" },
      excellenceTitle: { type: String, trim: true, default: "" },
      excellenceText: { type: String, trim: true, default: "" },
      whyChooseUsTitle: { type: String, trim: true, default: "" },
      whyChooseUsText: { type: String, trim: true, default: "" },
      ctaHeading: { type: String, trim: true, default: "" },
      ctaText: { type: String, trim: true, default: "" },
    },
    contact: {
      companyName: { type: String, trim: true, default: "Abhyati Food Pak Solutions Pvt Ltd" },
      addressLine1: { type: String, trim: true, default: "" },
      addressLine2: { type: String, trim: true, default: "" },
      phone: { type: String, trim: true, default: "" },
      email: { type: String, trim: true, default: "" },
      businessHoursLine1: { type: String, trim: true, default: "" },
      businessHoursLine2: { type: String, trim: true, default: "" },
      mapEmbedUrl: { type: String, trim: true, default: "" },
      googleMapsUrl: { type: String, trim: true, default: "" },
    },
    socialLinks: { type: [socialLinkSchema], default: [] },
    testimonials: { type: [testimonialSchema], default: [] },
    testimonialStats: {
      projects: { type: Number, default: 0 },
      clients: { type: Number, default: 0 },
    },
    stores: {
      title: { type: String, trim: true, default: "Stores" },
      subtitle: { type: String, trim: true, default: "" },
      entries: { type: [storeSchema], default: [] },
    },
    cataloguePdf: {
      fileId: { type: mongoose.Schema.Types.ObjectId, default: null },
      originalName: { type: String, trim: true, default: "" },
      uploadedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

siteContentSchema.set("toJSON", {
  virtuals: true,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    if (ret.cataloguePdf?.fileId) {
      ret.cataloguePdf.fileId = ret.cataloguePdf.fileId.toString();
    }
    return ret;
  },
});

export const SiteContent = mongoose.model("SiteContent", siteContentSchema);
