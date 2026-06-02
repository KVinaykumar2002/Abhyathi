import { useEffect, useState } from "react";
import { Input } from "@/components/ui";
import AdminSectionSaveBar from "@/components/admin/AdminSectionSaveBar";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentSectionSave } from "@/hooks/useSiteContentSectionSave";

function TextAreaField({ label, value, onChange, rows = 3 }) {
  return (
    <label className="block text-sm text-text-primary">
      {label}
      <textarea
        className="mt-1 w-full rounded-ds-sm border border-border-muted bg-surface-base px-ds-2 py-ds-2"
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function AdminContentContact() {
  const { data, isLoading } = useAdminSiteContent();
  const { saveSection, isPending } = useSiteContentSectionSave();
  const [contact, setContact] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data?.contact) setContact(data.contact);
  }, [data]);

  function set(key, value) {
    setContact((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setStatus("");
    try {
      await saveSection({ contact });
      setStatus("Contact page saved.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    }
  }

  if (isLoading) return <p className="text-text-disabled">Loading…</p>;

  return (
    <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <h2 className="mb-ds-3 text-xl font-semibold text-text-primary">Contact Page</h2>
      <div className="grid gap-ds-3 md:grid-cols-2">
        <Input label="Company Name" value={contact.companyName ?? ""} onChange={(e) => set("companyName", e.target.value)} />
        <Input label="Phone" value={contact.phone ?? ""} onChange={(e) => set("phone", e.target.value)} />
        <Input label="Email" value={contact.email ?? ""} onChange={(e) => set("email", e.target.value)} />
        <Input label="Address Line 1" value={contact.addressLine1 ?? ""} onChange={(e) => set("addressLine1", e.target.value)} />
        <Input label="Address Line 2" value={contact.addressLine2 ?? ""} onChange={(e) => set("addressLine2", e.target.value)} />
        <Input label="Business Hours 1" value={contact.businessHoursLine1 ?? ""} onChange={(e) => set("businessHoursLine1", e.target.value)} />
        <Input label="Business Hours 2" value={contact.businessHoursLine2 ?? ""} onChange={(e) => set("businessHoursLine2", e.target.value)} />
        <Input label="Google Maps URL" value={contact.googleMapsUrl ?? ""} onChange={(e) => set("googleMapsUrl", e.target.value)} />
      </div>
      <div className="mt-ds-3">
        <TextAreaField label="Map Embed URL" rows={4} value={contact.mapEmbedUrl ?? ""} onChange={(v) => set("mapEmbedUrl", v)} />
      </div>
      <AdminSectionSaveBar onSave={handleSave} isPending={isPending} statusMessage={status} label="Save Contact Page" />
    </section>
  );
}
