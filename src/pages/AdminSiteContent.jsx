import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import {
  useAdminSiteContent,
  useUpdateSiteContent,
} from "@/hooks/useSiteContent";

const EMPTY_SLIDE = {
  type: "image",
  mediaUrl: "",
  title: "",
  subtitle: "",
  ctaText: "",
  ctaHref: "",
  order: 0,
  isActive: true,
};

function SlideEditor({ title, slides, onChange }) {
  function updateSlide(index, key, value) {
    const next = slides.map((slide, i) =>
      i === index ? { ...slide, [key]: value } : slide
    );
    onChange(next);
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

      <div className="space-y-ds-3">
        {slides.map((slide, index) => (
          <div key={`${title}-${index}`} className="rounded-ds-sm border border-border-muted p-ds-3">
            <div className="mb-ds-2 flex items-center justify-between">
              <p className="font-medium text-text-primary">Slide {index + 1}</p>
              <button
                type="button"
                onClick={() => removeSlide(index)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-ds-sm text-text-disabled transition-colors hover:bg-feedback-error/10 hover:text-feedback-error"
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
                label="Media URL"
                value={slide.mediaUrl}
                onChange={(e) => updateSlide(index, "mediaUrl", e.target.value)}
              />
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
              <Input
                label="Order"
                type="number"
                value={slide.order ?? index}
                onChange={(e) => updateSlide(index, "order", Number(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

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

export default function AdminSiteContent() {
  const { data, isLoading } = useAdminSiteContent();
  const updateMutation = useUpdateSiteContent();
  const [formState, setFormState] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (data) setFormState(data);
  }, [data]);

  const canSubmit = useMemo(
    () => Boolean(formState) && !updateMutation.isPending,
    [formState, updateMutation.isPending]
  );

  function updateAbout(key, value) {
    setFormState((prev) => ({ ...prev, about: { ...prev.about, [key]: value } }));
  }

  function updateContact(key, value) {
    setFormState((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));
  }

  function updateSocial(index, key, value) {
    setFormState((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  }

  function updateStores(key, value) {
    setFormState((prev) => ({
      ...prev,
      stores: { ...prev.stores, [key]: value },
    }));
  }

  function updateStoreEntry(index, key, value) {
    setFormState((prev) => ({
      ...prev,
      stores: {
        ...prev.stores,
        entries: (prev.stores?.entries ?? []).map((item, i) =>
          i === index ? { ...item, [key]: value } : item
        ),
      },
    }));
  }

  function addStoreEntry() {
    setFormState((prev) => ({
      ...prev,
      stores: {
        ...prev.stores,
        entries: [
          ...(prev.stores?.entries ?? []),
          { name: "", address: "", phone: "", hours: "" },
        ],
      },
    }));
  }

  function removeStoreEntry(index) {
    setFormState((prev) => ({
      ...prev,
      stores: {
        ...prev.stores,
        entries: (prev.stores?.entries ?? []).filter((_, i) => i !== index),
      },
    }));
  }

  function updateTestimonial(index, key, value) {
    setFormState((prev) => ({
      ...prev,
      testimonials: (prev.testimonials ?? []).map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  }

  function addTestimonial() {
    setFormState((prev) => ({
      ...prev,
      testimonials: [
        ...(prev.testimonials ?? []),
        { name: "", role: "", quote: "", image: "" },
      ],
    }));
  }

  function removeTestimonial(index) {
    setFormState((prev) => ({
      ...prev,
      testimonials: (prev.testimonials ?? []).filter((_, i) => i !== index),
    }));
  }

  function addSocial() {
    setFormState((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks ?? []), { platform: "", url: "" }],
    }));
  }

  function removeSocial(index) {
    setFormState((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setStatusMessage("");
    try {
      await updateMutation.mutateAsync(formState);
      setStatusMessage("Site content updated successfully.");
    } catch (err) {
      setStatusMessage(err.message || "Failed to update site content.");
    }
  }

  if (isLoading || !formState) {
    return <p className="text-lg text-text-disabled">Loading site content…</p>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-ds-4">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary md:text-4xl">
          Site Content
        </h1>
        <p className="mt-ds-2 text-lg text-text-disabled">
          Manage homepage and product slides, About copy, contact details, and social links.
        </p>
      </div>

      {statusMessage && (
        <p className="text-base text-text-secondary" role="status">
          {statusMessage}
        </p>
      )}

      <form className="space-y-ds-4" onSubmit={handleSave}>
        <SlideEditor
          title="Hero Carousel (Home)"
          slides={formState.homeSlides ?? []}
          onChange={(homeSlides) => setFormState((prev) => ({ ...prev, homeSlides }))}
        />
        <SlideEditor
          title="Products Slides"
          slides={formState.productSlides ?? []}
          onChange={(productSlides) =>
            setFormState((prev) => ({ ...prev, productSlides }))
          }
        />

        <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
          <h2 className="mb-ds-3 text-xl font-semibold text-text-primary">About Page Content</h2>
          <div className="grid gap-ds-3 md:grid-cols-2">
            <Input label="Hero Title" value={formState.about?.heroTitle ?? ""} onChange={(e) => updateAbout("heroTitle", e.target.value)} />
            <Input label="Vision Title" value={formState.about?.visionTitle ?? ""} onChange={(e) => updateAbout("visionTitle", e.target.value)} />
            <Input label="Mission Title" value={formState.about?.missionTitle ?? ""} onChange={(e) => updateAbout("missionTitle", e.target.value)} />
            <Input label="Excellence Title" value={formState.about?.excellenceTitle ?? ""} onChange={(e) => updateAbout("excellenceTitle", e.target.value)} />
            <Input label="Why Choose Us Title" value={formState.about?.whyChooseUsTitle ?? ""} onChange={(e) => updateAbout("whyChooseUsTitle", e.target.value)} />
            <Input label="CTA Heading" value={formState.about?.ctaHeading ?? ""} onChange={(e) => updateAbout("ctaHeading", e.target.value)} />
          </div>
          <div className="mt-ds-3 grid gap-ds-3">
            <TextAreaField label="Vision Text" value={formState.about?.visionText} onChange={(value) => updateAbout("visionText", value)} />
            <TextAreaField label="Mission Text" value={formState.about?.missionText} onChange={(value) => updateAbout("missionText", value)} />
            <TextAreaField label="Excellence Text" value={formState.about?.excellenceText} onChange={(value) => updateAbout("excellenceText", value)} />
            <TextAreaField label="Why Choose Us Text" value={formState.about?.whyChooseUsText} onChange={(value) => updateAbout("whyChooseUsText", value)} />
            <TextAreaField label="CTA Text" value={formState.about?.ctaText} onChange={(value) => updateAbout("ctaText", value)} />
          </div>
        </section>

        <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
          <div className="mb-ds-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Testimonials</h2>
            <Button type="button" variant="secondary" size="sm" className="gap-2" onClick={addTestimonial}>
              <Plus className="h-4 w-4" />
              Add Testimonial
            </Button>
          </div>
          <div className="space-y-ds-3">
            {(formState.testimonials ?? []).map((item, index) => (
              <div
                key={`testimonial-${index}`}
                className="rounded-ds-sm border border-border-muted p-ds-3"
              >
                <div className="mb-ds-2 flex items-center justify-between">
                  <p className="font-medium text-text-primary">Testimonial {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeTestimonial(index)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-ds-sm text-text-disabled transition-colors hover:bg-feedback-error/10 hover:text-feedback-error"
                    aria-label="Remove testimonial"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-ds-2 md:grid-cols-2">
                  <Input
                    label="Name"
                    value={item.name ?? ""}
                    onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                  />
                  <Input
                    label="Role"
                    value={item.role ?? ""}
                    onChange={(e) => updateTestimonial(index, "role", e.target.value)}
                  />
                  <Input
                    label="Image URL"
                    value={item.image ?? ""}
                    onChange={(e) => updateTestimonial(index, "image", e.target.value)}
                  />
                </div>
                <div className="mt-ds-2">
                  <TextAreaField
                    label="Quote"
                    rows={3}
                    value={item.quote ?? ""}
                    onChange={(value) => updateTestimonial(index, "quote", value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
          <h2 className="mb-ds-3 text-xl font-semibold text-text-primary">Contact Details</h2>
          <div className="grid gap-ds-3 md:grid-cols-2">
            <Input label="Company Name" value={formState.contact?.companyName ?? ""} onChange={(e) => updateContact("companyName", e.target.value)} />
            <Input label="Phone" value={formState.contact?.phone ?? ""} onChange={(e) => updateContact("phone", e.target.value)} />
            <Input label="Email" value={formState.contact?.email ?? ""} onChange={(e) => updateContact("email", e.target.value)} />
            <Input label="Address Line 1" value={formState.contact?.addressLine1 ?? ""} onChange={(e) => updateContact("addressLine1", e.target.value)} />
            <Input label="Address Line 2" value={formState.contact?.addressLine2 ?? ""} onChange={(e) => updateContact("addressLine2", e.target.value)} />
            <Input label="Business Hours 1" value={formState.contact?.businessHoursLine1 ?? ""} onChange={(e) => updateContact("businessHoursLine1", e.target.value)} />
            <Input label="Business Hours 2" value={formState.contact?.businessHoursLine2 ?? ""} onChange={(e) => updateContact("businessHoursLine2", e.target.value)} />
            <Input label="Google Maps URL" value={formState.contact?.googleMapsUrl ?? ""} onChange={(e) => updateContact("googleMapsUrl", e.target.value)} />
          </div>
          <div className="mt-ds-3">
            <TextAreaField
              label="Map Embed URL"
              rows={4}
              value={formState.contact?.mapEmbedUrl ?? ""}
              onChange={(value) => updateContact("mapEmbedUrl", value)}
            />
          </div>
        </section>

        <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
          <div className="mb-ds-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Stores Information</h2>
            <Button type="button" variant="secondary" size="sm" className="gap-2" onClick={addStoreEntry}>
              <Plus className="h-4 w-4" />
              Add Store
            </Button>
          </div>
          <div className="grid gap-ds-3 md:grid-cols-2">
            <Input
              label="Stores Title"
              value={formState.stores?.title ?? ""}
              onChange={(e) => updateStores("title", e.target.value)}
            />
            <Input
              label="Stores Subtitle"
              value={formState.stores?.subtitle ?? ""}
              onChange={(e) => updateStores("subtitle", e.target.value)}
            />
          </div>
          <div className="mt-ds-3 space-y-ds-3">
            {(formState.stores?.entries ?? []).map((entry, index) => (
              <div
                key={`store-${index}`}
                className="rounded-ds-sm border border-border-muted p-ds-3"
              >
                <div className="mb-ds-2 flex items-center justify-between">
                  <p className="font-medium text-text-primary">Store {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeStoreEntry(index)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-ds-sm text-text-disabled transition-colors hover:bg-feedback-error/10 hover:text-feedback-error"
                    aria-label="Remove store"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-ds-2 md:grid-cols-2">
                  <Input
                    label="Store Name"
                    value={entry.name ?? ""}
                    onChange={(e) => updateStoreEntry(index, "name", e.target.value)}
                  />
                  <Input
                    label="Phone"
                    value={entry.phone ?? ""}
                    onChange={(e) => updateStoreEntry(index, "phone", e.target.value)}
                  />
                  <Input
                    label="Address"
                    value={entry.address ?? ""}
                    onChange={(e) => updateStoreEntry(index, "address", e.target.value)}
                  />
                  <Input
                    label="Business Hours"
                    value={entry.hours ?? ""}
                    onChange={(e) => updateStoreEntry(index, "hours", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
          <div className="mb-ds-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Social Links</h2>
            <Button type="button" variant="secondary" size="sm" className="gap-2" onClick={addSocial}>
              <Plus className="h-4 w-4" />
              Add Link
            </Button>
          </div>
          <div className="space-y-ds-2">
            {(formState.socialLinks ?? []).map((item, index) => (
              <div key={`social-${index}`} className="grid gap-ds-2 md:grid-cols-[1fr_2fr_auto]">
                <Input
                  label="Platform"
                  value={item.platform}
                  onChange={(e) => updateSocial(index, "platform", e.target.value)}
                />
                <Input
                  label="URL"
                  value={item.url}
                  onChange={(e) => updateSocial(index, "url", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-ds-sm text-text-disabled transition-colors hover:bg-feedback-error/10 hover:text-feedback-error"
                  aria-label="Remove social link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <Button type="submit" variant="primary" size="lg" disabled={!canSubmit}>
          {updateMutation.isPending ? "Saving..." : "Save Site Content"}
        </Button>
      </form>
    </div>
  );
}
