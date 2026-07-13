import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import SiteImageDropzone from "@/components/admin/SiteImageDropzone";
import AdminSectionSaveBar from "@/components/admin/AdminSectionSaveBar";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentSectionSave } from "@/hooks/useSiteContentSectionSave";

const EMPTY_STORE = {
  name: "",
  address: "",
  phone: "",
  hours: "",
  image: "",
  googleMapsUrl: "",
};

export default function AdminContentStores() {
  const { data, isLoading } = useAdminSiteContent();
  const { saveSection, isPending } = useSiteContentSectionSave();
  const [stores, setStores] = useState({ title: "", subtitle: "", entries: [] });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data?.stores) setStores(data.stores);
  }, [data]);

  function updateEntry(index, key, value) {
    setStores((prev) => ({
      ...prev,
      entries: prev.entries.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  }

  async function handleSave() {
    setStatus("");
    try {
      await saveSection({ stores });
      setStatus("Stores page saved.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    }
  }

  if (isLoading) return <p className="text-text-disabled">Loading…</p>;

  return (
    <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <div className="mb-ds-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Stores Page</h2>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={() =>
            setStores((prev) => ({
              ...prev,
              entries: [...(prev.entries ?? []), { ...EMPTY_STORE }],
            }))
          }
        >
          <Plus className="h-4 w-4" />
          Add Store
        </Button>
      </div>
      <div className="grid gap-ds-3 md:grid-cols-2">
        <Input label="Page Title" value={stores.title ?? ""} onChange={(e) => setStores((p) => ({ ...p, title: e.target.value }))} />
        <Input label="Page Subtitle" value={stores.subtitle ?? ""} onChange={(e) => setStores((p) => ({ ...p, subtitle: e.target.value }))} />
      </div>
      <div className="mt-ds-3 space-y-ds-3">
        {(stores.entries ?? []).map((entry, index) => (
          <div key={`store-${index}`} className="rounded-ds-sm border border-border-muted p-ds-3">
            <div className="mb-ds-2 flex justify-between">
              <p className="font-medium">Store {index + 1}</p>
              <button
                type="button"
                onClick={() =>
                  setStores((p) => ({ ...p, entries: p.entries.filter((_, i) => i !== index) }))
                }
                className="text-text-disabled hover:text-feedback-error"
                aria-label="Remove store"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-ds-3 lg:grid-cols-2">
              <div className="space-y-ds-2">
                <Input label="Name" value={entry.name ?? ""} onChange={(e) => updateEntry(index, "name", e.target.value)} />
                <Input label="Address" value={entry.address ?? ""} onChange={(e) => updateEntry(index, "address", e.target.value)} />
                <Input
                  label="Location (Google Maps URL)"
                  value={entry.googleMapsUrl ?? ""}
                  onChange={(e) => updateEntry(index, "googleMapsUrl", e.target.value)}
                  placeholder="https://maps.google.com/..."
                />
                <Input label="Phone" value={entry.phone ?? ""} onChange={(e) => updateEntry(index, "phone", e.target.value)} />
                <Input label="Hours" value={entry.hours ?? ""} onChange={(e) => updateEntry(index, "hours", e.target.value)} />
              </div>
              <div className="space-y-ds-2">
                <SiteImageDropzone
                  label="Store Photo"
                  value={entry.image ?? ""}
                  onChange={(url) => updateEntry(index, "image", url)}
                />
                <Input
                  label="Or photo URL"
                  value={entry.image ?? ""}
                  onChange={(e) => updateEntry(index, "image", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdminSectionSaveBar onSave={handleSave} isPending={isPending} statusMessage={status} label="Save Stores Page" />
    </section>
  );
}
