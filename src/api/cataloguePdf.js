import { API_BASE } from "@/lib/apiBase";
import { adminAuthHeaders } from "@/lib/adminHeaders";

async function parseJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export async function uploadCataloguePdf(file) {
  const formData = new FormData();
  formData.append("pdfFile", file);

  const res = await fetch(`${API_BASE}/api/admin/catalogue-pdf`, {
    method: "POST",
    headers: adminAuthHeaders(),
    body: formData,
  });

  return parseJson(res);
}

export async function deleteCataloguePdf() {
  const res = await fetch(`${API_BASE}/api/admin/catalogue-pdf`, {
    method: "DELETE",
    headers: adminAuthHeaders(),
  });

  return parseJson(res);
}
