import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminSiteContent,
  fetchSiteContent,
  updateSiteContent,
} from "@/api/siteContent";

export function useSiteContent() {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

export function useAdminSiteContent() {
  return useQuery({
    queryKey: ["admin", "site-content"],
    queryFn: fetchAdminSiteContent,
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSiteContent,
    onSuccess: (siteContent) => {
      queryClient.setQueryData(["site-content"], siteContent);
      queryClient.setQueryData(["admin", "site-content"], siteContent);
    },
  });
}
