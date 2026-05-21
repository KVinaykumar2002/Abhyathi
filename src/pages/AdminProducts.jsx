import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageShell from "@/components/PageShell";
import { Button, Input } from "@/components/ui";
import { PRODUCT_CATEGORIES } from "@/components/ProductCatalog";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
} from "@/api/products";
import { productImageSrc } from "@/lib/productImage";

const ADMIN_KEY_STORAGE = "abhyathi_admin_key";

const emptyForm = {
  name: "",
  price: "",
  category: PRODUCT_CATEGORIES[1] ?? "Containers",
  description: "",
  image: "",
  soldOut: false,
};

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [adminKey, setAdminKey] = useState(
    () => sessionStorage.getItem(ADMIN_KEY_STORAGE) || ""
  );
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(),
  });

  function saveAdminKey(key) {
    setAdminKey(key);
    sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!adminKey.trim()) {
      setStatus({ type: "error", message: "Enter your admin API key first." });
      return;
    }

    setSubmitting(true);
    try {
      if (!imageFile && !form.image.trim()) {
        setStatus({
          type: "error",
          message: "Add an image file or image URL.",
        });
        setSubmitting(false);
        return;
      }

      await createProduct(
        {
          name: form.name,
          price: Number(form.price),
          category: form.category,
          description: form.description,
          image: form.image,
          soldOut: form.soldOut,
        },
        adminKey.trim(),
        imageFile
      );
      setForm(emptyForm);
      setImageFile(null);
      setStatus({ type: "success", message: "Product uploaded successfully." });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to upload product.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!adminKey.trim()) {
      setStatus({ type: "error", message: "Admin API key required." });
      return;
    }
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id, adminKey.trim());
      setStatus({ type: "success", message: "Product deleted." });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to delete product.",
      });
    }
  }

  const categories = PRODUCT_CATEGORIES.filter((c) => c !== "All Products");

  return (
    <PageShell mainClassName="section-pad px-ds-3">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-primary text-ds-3xl font-medium text-text-primary md:text-ds-4xl">
          Admin — Upload products
        </h1>
        <p className="mt-ds-2 text-ds-md text-text-disabled">
          Add products to MongoDB. Set the same key as{" "}
          <code className="text-ds-sm">ADMIN_API_KEY</code> in backend/.env.
        </p>

        <div className="mt-ds-4 rounded-ds-md border border-border-muted bg-surface-raised p-ds-3">
          <Input
            label="Admin API key"
            type="password"
            name="adminKey"
            value={adminKey}
            onChange={(e) => saveAdminKey(e.target.value)}
            helper="Stored in this browser session only."
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-ds-4 space-y-ds-3 rounded-ds-md border border-border-muted bg-surface-raised p-ds-3"
        >
          <Input
            label="Product name"
            name="name"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <div className="grid gap-ds-3 sm:grid-cols-2">
            <Input
              label="Price (USD)"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
            />
            <div className="flex flex-col gap-ds-1 font-primary">
              <label htmlFor="category" className="text-ds-sm text-text-primary">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="min-h-[44px] rounded-ds-sm border border-border-muted bg-surface-raised px-ds-2 text-ds-md text-text-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-ds-1 font-primary">
            <label htmlFor="imageFile" className="text-ds-sm text-text-primary">
              Product image file
            </label>
            <input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="min-h-[44px] w-full rounded-ds-sm border border-border-muted bg-surface-raised px-ds-2 py-ds-2 text-ds-sm text-text-primary file:mr-3 file:rounded-full file:border-0 file:bg-text-secondary file:px-3 file:py-1 file:text-ds-sm file:text-surface-base"
            />
            <p className="text-ds-sm text-text-disabled">
              Uploads image binary to MongoDB GridFS (recommended).
            </p>
          </div>
          <Input
            label="Or image URL"
            name="image"
            type="url"
            value={form.image}
            onChange={(e) => updateField("image", e.target.value)}
            helper="Optional if you uploaded a file above."
          />
          <div className="flex flex-col gap-ds-1 font-primary">
            <label htmlFor="description" className="text-ds-sm text-text-primary">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full rounded-ds-sm border border-border-muted bg-surface-raised px-ds-2 py-ds-2 text-ds-md text-text-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
            />
          </div>
          <label className="flex items-center gap-ds-2 text-ds-md text-text-primary">
            <input
              type="checkbox"
              checked={form.soldOut}
              onChange={(e) => updateField("soldOut", e.target.checked)}
              className="h-4 w-4 rounded border-border-muted"
            />
            Mark as sold out
          </label>

          {status.message && (
            <p
              role="alert"
              className={
                status.type === "error"
                  ? "text-ds-sm text-feedback-error"
                  : "text-ds-sm text-text-secondary"
              }
            >
              {status.message}
            </p>
          )}

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Uploading…" : "Upload product"}
          </Button>
        </form>

        <section className="mt-ds-6">
          <h2 className="font-primary text-ds-xl text-text-primary">
            Products in database ({products.length})
          </h2>
          {isLoading ? (
            <p className="mt-ds-2 text-ds-md text-text-disabled">Loading…</p>
          ) : products.length === 0 ? (
            <p className="mt-ds-2 text-ds-md text-text-disabled">
              No products yet. Run{" "}
              <code className="text-ds-sm">npm run seed:force</code> in backend/
              to load all catalog images into MongoDB, or upload above.
            </p>
          ) : (
            <ul className="mt-ds-3 divide-y divide-border-muted rounded-ds-md border border-border-muted">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-ds-2 p-ds-3"
                >
                  <div className="flex items-center gap-ds-3">
                    {p.image && (
                      <img
                        src={productImageSrc(p.image)}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-ds-sm object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-text-primary">{p.name}</p>
                      <p className="text-ds-sm text-text-disabled">
                        {p.category} · ${p.price}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageShell>
  );
}
