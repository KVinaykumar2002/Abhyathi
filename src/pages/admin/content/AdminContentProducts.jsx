import { useEffect, useState } from "react";
import SlideEditor from "@/components/admin/SlideEditor";
import AdminSectionSaveBar from "@/components/admin/AdminSectionSaveBar";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentSectionSave } from "@/hooks/useSiteContentSectionSave";

export default function AdminContentProducts() {
  const { data, isLoading } = useAdminSiteContent();
  const { saveSection, isPending } = useSiteContentSectionSave();
  const [slides, setSlides] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data?.productSlides) setSlides(data.productSlides);
  }, [data]);

  async function handleSave() {
    setStatus("");
    try {
      await saveSection({ productSlides: slides });
      setStatus("Products hero saved.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    }
  }

  if (isLoading) return <p className="text-text-disabled">Loading…</p>;

  return (
    <div>
      <SlideEditor title="Products Page Hero Carousel" slides={slides} onChange={setSlides} />
      <AdminSectionSaveBar
        onSave={handleSave}
        isPending={isPending}
        statusMessage={status}
        label="Save Products Hero"
      />
    </div>
  );
}
