import { LayoutGrid, List, Pencil, Trash2 } from "lucide-react";
import { productImageSrc } from "@/lib/productImage";
import { cn } from "@/lib/utils";

function ActionButtons({ product, onEdit, onDelete }) {
  return (
    <div className="flex shrink-0 items-center gap-ds-1">
      <button
        type="button"
        onClick={() => onEdit(product)}
        className="flex h-10 w-10 items-center justify-center rounded-ds-sm text-text-disabled transition-colors hover:bg-text-secondary/15 hover:text-text-secondary"
        aria-label={`Edit ${product.name}`}
      >
        <Pencil className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(product.id)}
        className="flex h-10 w-10 items-center justify-center rounded-ds-sm text-text-disabled transition-colors hover:bg-feedback-error/10 hover:text-feedback-error"
        aria-label={`Delete ${product.name}`}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

function TableView({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-ds-sm border border-border-muted">
      <table className="w-full min-w-[720px] border-collapse text-left text-base">
        <thead>
          <tr className="border-b border-border-muted bg-surface-base text-sm font-semibold uppercase tracking-wider text-text-disabled">
            <th className="px-ds-3 py-ds-3">Image</th>
            <th className="px-ds-3 py-ds-3">Name</th>
            <th className="px-ds-3 py-ds-3">Category</th>
            <th className="px-ds-3 py-ds-3">Price</th>
            <th className="px-ds-3 py-ds-3">Status</th>
            <th className="px-ds-3 py-ds-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-b border-border-muted/80 bg-surface-raised transition-colors hover:bg-surface-base"
            >
              <td className="px-ds-3 py-ds-3">
                {p.image ? (
                  <img
                    src={productImageSrc(p.image)}
                    alt=""
                    className="h-14 w-14 rounded-ds-sm object-cover"
                  />
                ) : (
                  <span className="text-text-disabled">—</span>
                )}
              </td>
              <td className="max-w-[220px] px-ds-3 py-ds-3">
                <p className="text-lg font-medium text-text-primary">{p.name}</p>
                <p className="mt-0.5 line-clamp-1 text-base text-text-disabled">
                  {p.description}
                </p>
              </td>
              <td className="px-ds-3 py-ds-3 text-base text-text-disabled">{p.category}</td>
              <td className="px-ds-3 py-ds-3 text-lg font-medium text-text-primary">
                ${Number(p.price).toFixed(2)}
              </td>
              <td className="px-ds-3 py-ds-3">
                <span
                  className={cn(
                    "inline-flex rounded-full px-ds-3 py-1 text-sm font-semibold",
                    p.soldOut
                      ? "bg-feedback-error/15 text-feedback-error"
                      : "bg-text-secondary/15 text-text-secondary"
                  )}
                >
                  {p.soldOut ? "Sold out" : "Active"}
                </span>
              </td>
              <td className="px-ds-3 py-ds-3">
                <div className="flex justify-end">
                  <ActionButtons product={p} onEdit={onEdit} onDelete={onDelete} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GridView({ products, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-ds-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p) => (
        <article
          key={p.id}
          className="flex flex-col overflow-hidden rounded-ds-md border border-border-muted bg-surface-base"
        >
          <div className="relative aspect-[4/3] bg-surface-raised">
            {p.image ? (
              <img
                src={productImageSrc(p.image)}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-base text-text-disabled">
                No image
              </div>
            )}
            <span
              className={cn(
                "absolute right-2 top-2 rounded-full px-ds-3 py-1 text-sm font-semibold",
                p.soldOut
                  ? "bg-feedback-error text-white"
                  : "bg-text-secondary text-surface-base"
              )}
            >
              {p.soldOut ? "Sold out" : "Active"}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-ds-4">
            <p className="text-lg font-semibold text-text-primary">{p.name}</p>
            <p className="mt-ds-1 text-base text-text-disabled">{p.category}</p>
            <p className="mt-ds-2 line-clamp-2 flex-1 text-base leading-relaxed text-text-disabled">
              {p.description}
            </p>
            <div className="mt-ds-4 flex items-center justify-between border-t border-border-muted pt-ds-3">
              <span className="text-lg font-semibold text-text-secondary">
                ${Number(p.price).toFixed(2)}
              </span>
              <ActionButtons product={p} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function AdminProductCatalog({
  products,
  viewMode,
  onViewModeChange,
  onEdit,
  onDelete,
  isLoading,
}) {
  return (
    <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <div className="mb-ds-4 flex flex-wrap items-center justify-between gap-ds-3">
        <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
          Catalog ({products.length})
        </h2>
        <div
          className="inline-flex rounded-ds-sm border border-border-muted bg-surface-base p-0.5"
          role="group"
          aria-label="View mode"
        >
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-ds-2 rounded-ds-sm px-ds-4 text-base font-medium transition-colors",
              viewMode === "table"
                ? "bg-text-secondary text-surface-base"
                : "text-text-disabled hover:text-text-primary"
            )}
          >
            <List className="h-5 w-5" />
            Table
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-ds-2 rounded-ds-sm px-ds-4 text-base font-medium transition-colors",
              viewMode === "grid"
                ? "bg-text-secondary text-surface-base"
                : "text-text-disabled hover:text-text-primary"
            )}
          >
            <LayoutGrid className="h-5 w-5" />
            Grid
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-lg text-text-disabled">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="text-lg text-text-disabled">
          No products yet. Click &quot;Add product&quot; to create one.
        </p>
      ) : viewMode === "table" ? (
        <TableView products={products} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <GridView products={products} onEdit={onEdit} onDelete={onDelete} />
      )}
    </section>
  );
}
