import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminProductCatalog from "@/components/admin/AdminProductCatalog";
import ProductFormPanel from "@/components/admin/ProductFormPanel";
import { Button } from "@/components/ui";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/api/products";

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const formRef = useRef(null);

  const [viewMode, setViewMode] = useState("table");
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(),
  });

  function openCreateForm() {
    setFormMode("create");
    setEditingProduct(null);
    setFormOpen(true);
    setStatus({ type: "", message: "" });
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function openEditForm(product) {
    setFormMode("edit");
    setEditingProduct(product);
    setFormOpen(true);
    setStatus({ type: "", message: "" });
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function closeForm() {
    setFormOpen(false);
    setEditingProduct(null);
  }

  async function handleSave(payload, imageFile) {
    if (formMode === "edit" && editingProduct) {
      await updateProduct(editingProduct.id, payload, imageFile);
      setStatus({ type: "success", message: "Product updated on the live site." });
    } else {
      await createProduct(payload, imageFile);
      setStatus({ type: "success", message: "Product created on the live site." });
    }
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product from the database?")) return;

    try {
      await deleteProduct(id);
      if (editingProduct?.id === id) closeForm();
      setStatus({ type: "success", message: "Product removed." });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to delete product.",
      });
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-ds-5 flex flex-wrap items-end justify-between gap-ds-3">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary md:text-4xl">
            Products
          </h1>
          <p className="mt-ds-2 text-lg text-text-disabled">
            Add, edit, or remove catalog items. Changes sync to the public storefront.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="gap-ds-2 text-lg"
          onClick={openCreateForm}
        >
          <Plus className="h-5 w-5" />
          Add product
        </Button>
      </div>

      {status.message && (
        <p
          role="status"
          className={`mb-ds-4 text-base ${
            status.type === "error" ? "text-feedback-error" : "text-text-secondary"
          }`}
        >
          {status.message}
        </p>
      )}

      <div ref={formRef} className="mb-ds-5">
        <ProductFormPanel
          mode={formMode}
          product={editingProduct}
          open={formOpen}
          onClose={closeForm}
          onSaved={handleSave}
        />
      </div>

      <AdminProductCatalog
        products={products}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onEdit={openEditForm}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
