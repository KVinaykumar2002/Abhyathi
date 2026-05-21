const API_BASE = import.meta.env.VITE_API_URL || "";

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

export async function createProduct(payload, adminKey, imageFile) {
  let res;
  if (imageFile) {
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        form.append(key, String(value));
      }
    });
    form.append("imageFile", imageFile);
    res = await fetch(`${API_BASE}/api/admin/products`, {
      method: "POST",
      headers: { "x-admin-key": adminKey },
      body: form,
    });
  } else {
    res = await fetch(`${API_BASE}/api/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify(payload),
    });
  }
  const data = await parseJson(res);
  return data.product;
}

export async function deleteProduct(id, adminKey) {
  const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey },
  });
  return parseJson(res);
}
