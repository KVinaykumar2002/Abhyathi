import { adminAuthHeaders } from "@/lib/adminHeaders";
import { API_BASE } from "@/lib/apiBase";

async function parseJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchProducts(category) {
  const params = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`${API_BASE}/api/products${params}`);
  const data = await parseJson(res);
  return data.products ?? [];
}

export async function createProduct(payload, imageFile) {
  return writeProduct("POST", null, payload, imageFile);
}

async function writeProduct(method, id, payload, imageFile) {
  const url =
    method === "POST"
      ? `${API_BASE}/api/admin/products`
      : `${API_BASE}/api/admin/products/${id}`;

  let res;
  if (imageFile) {
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        form.append(key, String(value));
      }
    });
    form.append("imageFile", imageFile);
    res = await fetch(url, {
      method,
      headers: adminAuthHeaders(),
      body: form,
    });
  } else {
    const body = { ...payload };
    if (method === "PUT" && !body.image) {
      delete body.image;
    }
    res = await fetch(url, {
      method,
      headers: adminAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    });
  }
  const data = await parseJson(res);
  return data.product;
}

export async function updateProduct(id, payload, imageFile) {
  return writeProduct("PUT", id, payload, imageFile);
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
    method: "DELETE",
    headers: adminAuthHeaders(),
  });
  return parseJson(res);
}
