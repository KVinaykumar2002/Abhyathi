import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import SiteImageDropzone from "@/components/admin/SiteImageDropzone";

export const EMPTY_SLIDE = {
  type: "image",
  mediaUrl: "",
  title: "",
  subtitle: "",
  ctaText: "",
  ctaHref: "",
  order: 0,
  isActive: true,
};

export default function SlideEditor({ title, slides, onChange }) {
  function updateSlide(index, key, value) {
    onChange(slides.map((slide, i) => (i === index ? { ...slide, [key]: value } : slide)));
  }

  function addSlide() {
    onChange([...slides, { ...EMPTY_SLIDE, order: slides.length }]);
  }

  function removeSlide(index) {
    onChange(slides.filter((_, i) => i !== index));
  }

  return (
    <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <div className="mb-ds-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        <Button type="button" variant="secondary" size="sm" className="gap-2" onClick={addSlide}>
          <Plus className="h-4 w-4" />
          Add Slide
        </Button>
      </div>

      <div className="space-y-ds-4">
        {slides.length === 0 && (
          <p className="text-base text-text-disabled">No slides yet. Click Add Slide.</p>
        )}
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className="rounded-ds-sm border border-border-muted p-ds-3">
            <div className="mb-ds-2 flex items-center justify-between">
              <p className="font-medium text-text-primary">Slide {index + 1}</p>
              <button
                type="button"
                onClick={() => removeSlide(index)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-ds-sm text-text-disabled hover:bg-feedback-error/10 hover:text-feedback-error"
                aria-label="Remove slide"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-ds-3 md:grid-cols-2">
              <label className="text-sm text-text-primary">
                Media Type
                <select
                  className="mt-1 w-full rounded-ds-sm border border-border-muted bg-surface-base px-ds-2 py-ds-2"
                  value={slide.type}
                  onChange={(e) => updateSlide(index, "type", e.target.value)}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </label>
              <Input
                label="Order"
                type="number"
                value={slide.order ?? index}
                onChange={(e) => updateSlide(index, "order", Number(e.target.value))}
              />
            </div>

            {slide.type === "image" ? (
              <div className="mt-ds-3 grid gap-ds-3 lg:grid-cols-2">
                <SiteImageDropzone
                  label="Slide image"
                  value={slide.mediaUrl}
                  onChange={(url) => updateSlide(index, "mediaUrl", url)}
                />
                <Input
                  label="Or image URL path"
                  value={slide.mediaUrl}
                  onChange={(e) => updateSlide(index, "mediaUrl", e.target.value)}
                  helper="e.g. /image.png or https://..."
                />
              </div>
            ) : (
              <div className="mt-ds-3">
                <Input
                  label="Video URL"
                  value={slide.mediaUrl}
                  onChange={(e) => updateSlide(index, "mediaUrl", e.target.value)}
                  helper="Path under public/ or full https URL"
                />
              </div>
            )}

            <div className="mt-ds-3 grid gap-ds-3 md:grid-cols-2">
              <Input
                label="Title"
                value={slide.title}
                onChange={(e) => updateSlide(index, "title", e.target.value)}
              />
              <Input
                label="Subtitle"
                value={slide.subtitle}
                onChange={(e) => updateSlide(index, "subtitle", e.target.value)}
              />
              <Input
                label="CTA Text"
                value={slide.ctaText}
                onChange={(e) => updateSlide(index, "ctaText", e.target.value)}
              />
              <Input
                label="CTA Link"
                value={slide.ctaHref}
                onChange={(e) => updateSlide(index, "ctaHref", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
