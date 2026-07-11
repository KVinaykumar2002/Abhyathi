import { useEffect, useState } from "react";
import { Input } from "@/components/ui";
import AdminSectionSaveBar from "@/components/admin/AdminSectionSaveBar";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentSectionSave } from "@/hooks/useSiteContentSectionSave";
import { DEFAULT_TRUST_STATS } from "@/components/TrustStats";

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
  const [testimonialStats, setTestimonialStats] = useState({ ...DEFAULT_TRUST_STATS });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data?.about) setAbout(data.about);
    if (data?.testimonialStats) {
      setTestimonialStats({
        customers: data.testimonialStats.customers ?? DEFAULT_TRUST_STATS.customers,
        products: data.testimonialStats.products ?? DEFAULT_TRUST_STATS.products,
        rating: data.testimonialStats.rating ?? DEFAULT_TRUST_STATS.rating,
      });
    }
  }, [data]);

  function set(key, value) {
    setAbout((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setStatus("");
    try {
      await saveSection({
        about,
        testimonialStats: {
          customers: Number(testimonialStats.customers) || 0,
          products: Number(testimonialStats.products) || 0,
          rating: Number(testimonialStats.rating) || 0,
        },
      });
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

      <div className="mt-ds-4 rounded-ds-sm border border-border-muted p-ds-3">
        <p className="mb-ds-2 font-medium text-text-primary">Trust Statistics</p>
        <p className="mb-ds-3 text-sm text-text-disabled">
          Shared with the Testimonials page.
        </p>
        <div className="grid gap-ds-3 md:grid-cols-3">
          <Input
            label="Customers (5000+)"
            type="number"
            min={0}
            value={testimonialStats.customers ?? 0}
            onChange={(e) =>
              setTestimonialStats((prev) => ({ ...prev, customers: e.target.value }))
            }
          />
          <Input
            label="Products (1500+)"
            type="number"
            min={0}
            value={testimonialStats.products ?? 0}
            onChange={(e) =>
              setTestimonialStats((prev) => ({ ...prev, products: e.target.value }))
            }
          />
          <Input
            label="Customer Rating (out of 5)"
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={testimonialStats.rating ?? 5}
            onChange={(e) =>
              setTestimonialStats((prev) => ({ ...prev, rating: e.target.value }))
            }
          />
        </div>
      </div>

      <AdminSectionSaveBar onSave={handleSave} isPending={isPending} statusMessage={status} label="Save About Page" />
    </section>
  );
}
