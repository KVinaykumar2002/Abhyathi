import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import AdminSectionSaveBar from "@/components/admin/AdminSectionSaveBar";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentSectionSave } from "@/hooks/useSiteContentSectionSave";

export default function AdminContentSocial() {
  const { data, isLoading } = useAdminSiteContent();
  const { saveSection, isPending } = useSiteContentSectionSave();
  const [socialLinks, setSocialLinks] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data?.socialLinks) setSocialLinks(data.socialLinks);
  }, [data]);

  async function handleSave() {
    setStatus("");
    try {
      await saveSection({ socialLinks });
      setStatus("Social links saved.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    }
  }

  if (isLoading) return <p className="text-text-disabled">Loading…</p>;

  return (
    <section className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
      <div className="mb-ds-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Social & Footer Links</h2>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={() => setSocialLinks((prev) => [...prev, { platform: "", url: "" }])}
        >
          <Plus className="h-4 w-4" />
          Add Link
        </Button>
      </div>
      <div className="space-y-ds-2">
        {socialLinks.map((item, index) => (
          <div key={`social-${index}`} className="grid gap-ds-2 md:grid-cols-[1fr_2fr_auto]">
            <Input
              label="Platform"
              value={item.platform}
              onChange={(e) =>
                setSocialLinks((prev) =>
                  prev.map((row, i) => (i === index ? { ...row, platform: e.target.value } : row))
                )
              }
            />
            <Input
              label="URL"
              value={item.url}
              onChange={(e) =>
                setSocialLinks((prev) =>
                  prev.map((row, i) => (i === index ? { ...row, url: e.target.value } : row))
                )
              }
            />
            <button
              type="button"
              onClick={() => setSocialLinks((prev) => prev.filter((_, i) => i !== index))}
              className="mt-6 inline-flex h-11 w-11 items-center justify-center text-text-disabled hover:text-feedback-error"
              aria-label="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <AdminSectionSaveBar onSave={handleSave} isPending={isPending} statusMessage={status} label="Save Social Links" />
    </section>
  );
}
