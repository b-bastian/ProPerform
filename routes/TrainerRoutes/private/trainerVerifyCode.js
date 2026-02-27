import express from "express";
import { db } from "../../../db.js";
import { createRateLimiter } from "../../../middleware/rate.js";
import { requireAuth } from "../../../middleware/auth.js";

const router = express.Router();

router.post(
  "/verify-code",
  requireAuth,
  createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 }),
  async (req, res) => {
    const { invite_code } = req.body;

    if (!invite_code?.trim()) {
      return res.status(400).json({ error: "Einladungscode fehlt." });
    }

    try {
      const [rows] = await db.execute(
        "SELECT tid FROM trainers WHERE invite_code = ?",
        [invite_code.trim()],
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "Ungültiger Einladungscode." });
      }

      const trainerId = rows[0].tid;

      // Beispiel: Link in mapping table
      await db.execute(
        "INSERT INTO trainer_athletes (trainer_id, user_id) VALUES (?, ?)",
        [trainerId, req.user.uid],
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("verify-code error:", error);
      return res.status(500).json({ error: "Interner Serverfehler." });
    }
  },
);

export default router;
