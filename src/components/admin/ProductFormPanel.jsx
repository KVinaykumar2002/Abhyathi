import { useEffect, useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import ImageDropzone from "@/components/admin/ImageDropzone";
import { Button, Input } from "@/components/ui";
import { PRODUCT_CATEGORIES } from "@/components/ProductCatalog";
import { productImageSrc } from "@/lib/productImage";

export const emptyProductForm = {
  name: "",
  price: "",
  category: PRODUCT_CATEGORIES[1] ?? "Containers",
  description: "",
  image: "",
  soldOut: false,
};

export function productToForm(product) {
  if (!product) return { ...emptyProductForm };
  const image =
    product.image?.startsWith("/api/media") ||
    product.image?.startsWith("data:image/")
      ? ""
      : product.image || "";
  return {
    name: product.name ?? "",
    price: product.price != null ? String(product.price) : "",
    category: product.category ?? emptyProductForm.category,
    description: product.description ?? "",
    image,
    soldOut: Boolean(product.soldOut),
  };
}

export default function ProductFormPanel({
  mode,
  product,
  open,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState(emptyProductForm);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit";
  const categories = PRODUCT_CATEGORIES.filter((c) => c !== "All Products");

  useEffect(() => {
    if (!open) return;
    setForm(productToForm(product));
    setImageFile(null);
    setError("");
  }, [open, product, mode]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const needsImage = !isEdit;
      if (needsImage && !imageFile && !form.image.trim()) {
        setError("Add an image file or image URL.");
        return;
      }

      await onSaved(
        {
          name: form.name,
          price: Number(form.price),
          category: form.category,
          description: form.description,
          image: form.image.trim() || undefined,
          soldOut: form.soldOut,
        },
        imageFile
      );

      if (!isEdit) {
        setForm(emptyProductForm);
        setImageFile(null);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save product.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="rounded-ds-md border border-text-secondary/30 bg-surface-raised p-ds-4 shadow-lg">
      <div className="mb-ds-4 flex items-start justify-between gap-ds-3">
        <h2 className="flex items-center gap-ds-2 text-xl font-semibold text-text-primary md:text-2xl">
          {isEdit ? (
            <>
              <Pencil className="h-6 w-6 text-text-secondary" />
              Edit product
            </>
          ) : (
            <>
              <Plus className="h-6 w-6 text-text-secondary" />
              New product
            </>
          )}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-ds-sm text-text-disabled hover:bg-surface-base hover:text-text-primary"
          aria-label="Close form"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {isEdit && product?.image && !imageFile && (
        <div className="mb-ds-3 flex items-center gap-ds-3 rounded-ds-sm border border-border-muted bg-surface-base p-ds-3">
          <img
            src={productImageSrc(product.image)}
            alt=""
            className="h-20 w-20 rounded-ds-sm object-cover"
          />
          <p className="text-base text-text-disabled">
            Current image — upload a new file below to replace it.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-ds-4 md:grid-cols-2">
        <Input
          label="Product name"
          name="name"
          size="lg"
          required
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <Input
          label="Price (USD)"
          name="price"
          type="number"
          size="lg"
          min="0"
          step="0.01"
          required
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
        />
        <div className="flex flex-col gap-ds-2 font-primary md:col-span-2">
          <label htmlFor="form-category" className="text-base font-medium text-text-primary">
            Category
          </label>
          <select
            id="form-category"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="min-h-[48px] rounded-ds-sm border border-border-muted bg-surface-base px-ds-3 text-lg text-text-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <ImageDropzone file={imageFile} onFileChange={setImageFile} />
        </div>

        <Input
          label={isEdit ? "Replace with image URL (optional)" : "Or image URL"}
          name="image"
          type="url"
          size="lg"
          value={form.image}
          onChange={(e) => updateField("image", e.target.value)}
          wrapperClassName="md:col-span-2"
        />

        <div className="flex flex-col gap-ds-2 font-primary md:col-span-2">
          <label htmlFor="form-description" className="text-base font-medium text-text-primary">
            Description
          </label>
          <textarea
            id="form-description"
            required
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full rounded-ds-sm border border-border-muted bg-surface-base px-ds-3 py-ds-2 text-lg text-text-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
          />
        </div>

        <label className="flex items-center gap-ds-2 text-lg text-text-primary md:col-span-2">
          <input
            type="checkbox"
            checked={form.soldOut}
            onChange={(e) => updateField("soldOut", e.target.checked)}
            className="h-5 w-5 rounded border-border-muted"
          />
          Mark as sold out
        </label>

        {error && (
          <p role="alert" className="text-base text-feedback-error md:col-span-2">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-ds-3 md:col-span-2">
          <Button type="submit" variant="primary" size="lg" className="text-lg" disabled={submitting}>
            {submitting ? "Saving…" : isEdit ? "Update product" : "Save product"}
          </Button>
          <Button type="button" variant="secondary" size="lg" className="text-lg" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
