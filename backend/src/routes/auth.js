import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

function signToken(admin) {
  return jwt.sign(
    { sub: admin._id.toString(), email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/** POST /api/auth/login */
router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(admin);
    res.json({
      token,
      admin: admin.toJSON(),
    });
  } catch (err) {
    next(err);
  }
});

/** GET /api/auth/me — current admin session */
router.get("/me", requireAdmin, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin account not found" });
    }
    res.json({ admin: admin.toJSON() });
  } catch (err) {
    next(err);
  }
});

export default router;
