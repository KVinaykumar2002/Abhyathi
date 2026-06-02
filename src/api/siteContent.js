import { API_BASE } from "@/lib/apiBase";
import { adminAuthHeaders } from "@/lib/adminHeaders";

async function parseJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchSiteContent() {
  const res = await fetch(`${API_BASE}/api/site-content`);
  const data = await parseJson(res);
  return data.siteContent;
}

export async function fetchAdminSiteContent() {
  const res = await fetch(`${API_BASE}/api/admin/site-content`, {
    headers: adminAuthHeaders(),
  });
  const data = await parseJson(res);
  return data.siteContent;
}

export async function updateSiteContent(siteContent) {
  const res = await fetch(`${API_BASE}/api/admin/site-content`, {
    method: "PUT",
    headers: adminAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ siteContent }),
  });
  const data = await parseJson(res);
  return data.siteContent;
}
