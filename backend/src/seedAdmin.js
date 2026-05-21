import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import { Admin } from "./models/Admin.js";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env");
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await Admin.findOne({ email });

  if (existing) {
    existing.passwordHash = passwordHash;
    existing.name = process.env.ADMIN_NAME || "Administrator";
    await existing.save();
    console.log(`Updated admin user: ${email}`);
  } else {
    await Admin.create({
      email,
      passwordHash,
      name: process.env.ADMIN_NAME || "Administrator",
      role: "admin",
    });
    console.log(`Created admin user: ${email}`);
  }

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
