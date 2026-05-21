import { getAdminToken } from "@/context/AdminAuthContext";

export function adminAuthHeaders(extra = {}) {
  const token = getAdminToken();
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
