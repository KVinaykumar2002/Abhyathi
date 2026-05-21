/**
 * CORS: CLIENT_ORIGIN=* (or unset) allows any origin (reflects request Origin).
 * Comma-separated list restricts to those URLs, e.g. http://localhost:4000,https://app.example.com
 */
export function getCorsOptions() {
  const raw = process.env.CLIENT_ORIGIN?.trim();

  if (!raw || raw === "*") {
    return {
      origin: true,
      credentials: true,
    };
  }

  const origins = raw.split(",").map((o) => o.trim()).filter(Boolean);

  return {
    origin: origins.length === 1 ? origins[0] : origins,
    credentials: true,
  };
}
