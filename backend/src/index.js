import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import { getCorsOptions } from "./config/cors.js";
import productsRouter from "./routes/products.js";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import mediaRouter from "./routes/media.js";
import siteContentRouter from "./routes/siteContent.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(getCorsOptions()));
app.use(express.json({ limit: "15mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter);
app.use("/api/media", mediaRouter);
app.use("/api/products", productsRouter);
app.use("/api/site-content", siteContentRouter);
app.use("/api/admin", adminRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
