/** Backend origin — no trailing slash. Empty in dev uses Vite /api proxy to localhost. */
const DEFAULT_PROD_API = "https://abhyathi.onrender.com";

export const API_BASE = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? DEFAULT_PROD_API : "")
).replace(/\/$/, "");
