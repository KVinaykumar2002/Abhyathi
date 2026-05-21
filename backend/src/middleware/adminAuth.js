export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(503).json({ message: "Admin API is not configured" });
  }

  const key = req.header("x-admin-key");
  if (!key || key !== expected) {
    return res.status(401).json({ message: "Invalid or missing admin key" });
  }

  next();
}
