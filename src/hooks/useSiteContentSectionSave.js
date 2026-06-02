import { useUpdateSiteContent } from "@/hooks/useSiteContent";
import { fetchAdminSiteContent } from "@/api/siteContent";

export function useSiteContentSectionSave() {
  const updateMutation = useUpdateSiteContent();

  async function saveSection(partial) {
    const latest = await fetchAdminSiteContent();
    const merged = { ...latest, ...partial };
    return updateMutation.mutateAsync(merged);
  }

  return {
    saveSection,
    isPending: updateMutation.isPending,
    error: updateMutation.error,
  };
}
