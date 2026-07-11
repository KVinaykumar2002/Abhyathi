import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import SiteImageDropzone from "@/components/admin/SiteImageDropzone";
import AdminSectionSaveBar from "@/components/admin/AdminSectionSaveBar";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentSectionSave } from "@/hooks/useSiteContentSectionSave";

function TextAreaField({ label, value, onChange }) {
  return (
    <label className="block text-sm text-text-primary">
      {label}
      <textarea
        className="mt-1 w-full rounded-ds-sm border border-border-muted bg-surface-base px-ds-2 py-ds-2"
        rows={3}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function AdminContentTestimonials() {
  const { data, isLoading } = useAdminSiteContent();
  const { saveSection, isPending } = useSiteContentSectionSave();
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialStats, setTestimonialStats] = useState({ projects: 0, clients: 0 });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data?.testimonials) setTestimonials(data.testimonials);
    if (data?.testimonialStats) {
      setTestimonialStats({
        projects: data.testimonialStats.projects ?? 0,
        clients: data.testimonialStats.clients ?? 0,
      });
    }
  }, [data]);

  function update(index, key, value) {
    setTestimonials((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  }

  async function handleSave() {
    setStatus("");
    try {
      await saveSection({
        testimonials,
        testimonialStats: {
          projects: Number(testimonialStats.projects) || 0,
          clients: Number(testimonialStats.clients) || 0,
        },
      });
      setStatus("Testimonials saved.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    }
  }

  if (isLoading) return <p className="text-text-disabled">Loading…</p>;

  return (
    <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <div className="mb-ds-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Testimonials</h2>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={() =>
            setTestimonials((prev) => [
              ...prev,
              { name: "", role: "", quote: "", image: "" },
            ])
          }
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="mb-ds-4 rounded-ds-sm border border-border-muted p-ds-3">
        <p className="mb-ds-2 font-medium text-text-primary">Statistics Counters</p>
        <p className="mb-ds-3 text-sm text-text-disabled">
          Shown below customer reviews on the testimonials section.
        </p>
        <div className="grid gap-ds-3 md:grid-cols-2">
          <Input
            label="Number of Projects"
            type="number"
            min={0}
            value={testimonialStats.projects ?? 0}
            onChange={(e) =>
              setTestimonialStats((prev) => ({ ...prev, projects: e.target.value }))
            }
          />
          <Input
            label="Number of Clients"
            type="number"
            min={0}
            value={testimonialStats.clients ?? 0}
            onChange={(e) =>
              setTestimonialStats((prev) => ({ ...prev, clients: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-ds-4">
        {testimonials.map((item, index) => (
          <div key={`t-${index}`} className="rounded-ds-sm border border-border-muted p-ds-3">
            <div className="mb-ds-2 flex justify-between">
              <p className="font-medium">Testimonial {index + 1}</p>
              <button
                type="button"
                onClick={() => setTestimonials((prev) => prev.filter((_, i) => i !== index))}
                className="text-text-disabled hover:text-feedback-error"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-ds-3 lg:grid-cols-2">
              <div className="space-y-ds-2">
                <Input label="Name" value={item.name ?? ""} onChange={(e) => update(index, "name", e.target.value)} />
                <Input label="Role" value={item.role ?? ""} onChange={(e) => update(index, "role", e.target.value)} />
                <TextAreaField label="Quote" value={item.quote} onChange={(v) => update(index, "quote", v)} />
              </div>
              <div className="space-y-ds-2">
                <SiteImageDropzone
                  label="Photo"
                  value={item.image ?? ""}
                  onChange={(url) => update(index, "image", url)}
                />
                <Input
                  label="Or image URL"
                  value={item.image ?? ""}
                  onChange={(e) => update(index, "image", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdminSectionSaveBar onSave={handleSave} isPending={isPending} statusMessage={status} label="Save Testimonials" />
    </section>
  );
}
