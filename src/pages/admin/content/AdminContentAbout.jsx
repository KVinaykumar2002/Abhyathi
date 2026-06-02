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

export default function AdminContentAbout() {
  const { data, isLoading } = useAdminSiteContent();
  const { saveSection, isPending } = useSiteContentSectionSave();
  const [about, setAbout] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data?.about) setAbout(data.about);
  }, [data]);

  function set(key, value) {
    setAbout((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setStatus("");
    try {
      await saveSection({ about });
      setStatus("About page saved.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    }
  }

  if (isLoading) return <p className="text-text-disabled">Loading…</p>;

  return (
    <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <h2 className="mb-ds-3 text-xl font-semibold text-text-primary">About Page</h2>
      <div className="grid gap-ds-3 md:grid-cols-2">
        <Input label="Hero Title" value={about.heroTitle ?? ""} onChange={(e) => set("heroTitle", e.target.value)} />
        <Input label="Vision Title" value={about.visionTitle ?? ""} onChange={(e) => set("visionTitle", e.target.value)} />
        <Input label="Mission Title" value={about.missionTitle ?? ""} onChange={(e) => set("missionTitle", e.target.value)} />
        <Input label="Excellence Title" value={about.excellenceTitle ?? ""} onChange={(e) => set("excellenceTitle", e.target.value)} />
        <Input label="Why Choose Us Title" value={about.whyChooseUsTitle ?? ""} onChange={(e) => set("whyChooseUsTitle", e.target.value)} />
        <Input label="CTA Heading" value={about.ctaHeading ?? ""} onChange={(e) => set("ctaHeading", e.target.value)} />
      </div>
      <div className="mt-ds-3 grid gap-ds-3">
        <TextAreaField label="Vision Text" value={about.visionText} onChange={(v) => set("visionText", v)} />
        <TextAreaField label="Mission Text" value={about.missionText} onChange={(v) => set("missionText", v)} />
        <TextAreaField label="Excellence Text" value={about.excellenceText} onChange={(v) => set("excellenceText", v)} />
        <TextAreaField label="Why Choose Us Text" value={about.whyChooseUsText} onChange={(v) => set("whyChooseUsText", v)} />
        <TextAreaField label="CTA Text" value={about.ctaText} onChange={(v) => set("ctaText", v)} />
      </div>
      <AdminSectionSaveBar onSave={handleSave} isPending={isPending} statusMessage={status} label="Save About Page" />
    </section>
  );
}
