import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentSectionSave } from "@/hooks/useSiteContentSectionSave";
import { resolveProductCategories } from "@/lib/productCategories";

export default function AdminCategoryManager({ products = [] }) {
  const { data, isLoading } = useAdminSiteContent();
  const { saveSection, isPending } = useSiteContentSectionSave();
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const categories = useMemo(() => resolveProductCategories(data), [data]);

  const productCounts = useMemo(() => {
    const map = {};
    for (const p of products) {
      const key = p.category || "";
      map[key] = (map[key] || 0) + 1;
    }
    return map;
  }, [products]);

  async function persist(nextCategories) {
    setStatus("");
    setError("");
    try {
      await saveSection({ productCategories: nextCategories });
      setStatus("Categories saved.");
    } catch (err) {
      setError(err.message || "Failed to save categories.");
      throw err;
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const name = newCategory.trim();
    if (!name) {
      setError("Enter a category name.");
      return;
    }
    if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setError("That category already exists.");
      return;
    }
    await persist([...categories, name]);
    setNewCategory("");
  }

  async function handleRemove(category) {
    const count = productCounts[category] || 0;
    if (count > 0) {
      setError(
        `Cannot remove “${category}” — ${count} product${count === 1 ? "" : "s"} still use it. Reassign or delete those products first.`
      );
      return;
    }
    if (!window.confirm(`Remove category “${category}”?`)) return;
    await persist(categories.filter((c) => c !== category));
  }

  if (isLoading) {
    return <p className="text-text-disabled">Loading categories…</p>;
  }

  return (
    <section className="mb-ds-5 rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <div className="mb-ds-3">
        <h2 className="text-xl font-semibold text-text-primary">Product Categories</h2>
        <p className="mt-ds-1 text-base text-text-disabled">
          Add or remove categories. These appear on the public catalog and product form.
        </p>
      </div>

      <form onSubmit={handleAdd} className="mb-ds-4 flex flex-wrap items-end gap-ds-2">
        <Input
          label="New category"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
            setError("");
          }}
          placeholder="e.g. Cutlery"
          wrapperClassName="min-w-[220px] flex-1"
        />
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="gap-2"
          disabled={isPending}
        >
          <Plus className="h-4 w-4" />
          Add category
        </Button>
      </form>

      {categories.length === 0 ? (
        <p className="text-base text-text-disabled">No categories yet. Add one above.</p>
      ) : (
        <ul className="space-y-ds-2">
          {categories.map((category) => {
            const count = productCounts[category] || 0;
            return (
              <li
                key={category}
                className="flex items-center justify-between gap-ds-3 rounded-ds-sm border border-border-muted bg-surface-base px-ds-3 py-ds-2"
              >
                <div>
                  <p className="font-medium text-text-primary">{category}</p>
                  <p className="text-sm text-text-disabled">
                    {count} product{count === 1 ? "" : "s"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(category)}
                  disabled={isPending}
                  className="flex h-10 w-10 items-center justify-center rounded-ds-sm text-text-disabled transition-colors hover:bg-feedback-error/10 hover:text-feedback-error disabled:opacity-50"
                  aria-label={`Remove ${category}`}
                  title={count > 0 ? "Reassign products before removing" : "Remove category"}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {(error || status) && (
        <p
          role="status"
          className={`mt-ds-3 text-base ${error ? "text-feedback-error" : "text-text-secondary"}`}
        >
          {error || status}
        </p>
      )}
    </section>
  );
}
