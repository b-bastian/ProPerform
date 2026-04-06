import express from "express";
import { db } from "../../../db.js";
import { requireAuth } from "../../../middleware/auth.js";
import { requireRole } from "../../../middleware/role.js";

const router = express.Router();

// Create exercise (trainer only)
router.post(
  "/exercises",
  requireAuth,
  requireRole("trainer"),
  async (req, res) => {
    const creatorId = req.user.uid ?? req.user.tid ?? null;
    const { name, description, video_url, thumbnail_url, sid, dlid } = req.body;

    console.log("[trainerExercisesRoutes] create exercise request", {
      creatorId,
      body: { name, description, video_url, thumbnail_url, sid, dlid },
    });

    try {
      const result = await db.query(
        `INSERT INTO exercises
        (name, description, video_url, thumbnail_url, sid, dlid, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, description, video_url, thumbnail_url, sid, dlid, creatorId],
      );

      console.log("[trainerExercisesRoutes] create exercise success", {
        eid: result.insertId,
        creatorId,
      });

      return res.status(201).json({ eid: result.insertId });
    } catch (err) {
      console.error("[trainerExercisesRoutes] create exercise failed", err);
      return res.status(500).json({ error: "failed" });
    }
  },
);

// Update exercise (only own)
router.put(
  "/exercises/:eid",
  requireAuth,
  requireRole("trainer"),
  async (req, res) => {
    const { eid } = req.params;
    const creatorId = req.user.uid ?? req.user.tid ?? null;
    const { name, description } = req.body;

    console.log("[trainerExercisesRoutes] update exercise request", {
      eid,
      creatorId,
      body: { name, description },
    });

    try {
      const [check] = await db.query(
        "SELECT eid FROM exercises WHERE eid = ? AND created_by = ?",
        [eid, creatorId],
      );

      if (check.length === 0) {
        return res.status(403).json({ error: "not yours" });
      }

      await db.query(
        "UPDATE exercises SET name = ?, description = ? WHERE eid = ?",
        [name, description, eid],
      );

      console.log("[trainerExercisesRoutes] update exercise success", {
        eid,
        creatorId,
      });

      return res.json({ message: "updated" });
    } catch (err) {
      console.error("[trainerExercisesRoutes] update exercise failed", err);
      return res.status(500).json({ error: "failed" });
    }
  },
);

// Delete exercise (only own)
router.delete(
  "/exercises/:eid",
  requireAuth,
  requireRole("trainer"),
  async (req, res) => {
    const { eid } = req.params;
    const creatorId = req.user.uid ?? req.user.tid ?? null;

    console.log("[trainerExercisesRoutes] delete exercise request", {
      eid,
      creatorId,
    });

    try {
      const result = await db.query(
        "DELETE FROM exercises WHERE eid = ? AND created_by = ?",
        [eid, creatorId],
      );

      if (result.affectedRows === 0) {
        return res.status(403).json({ error: "not yours" });
      }

      console.log("[trainerExercisesRoutes] delete exercise success", {
        eid,
        creatorId,
      });

      return res.json({ message: "deleted" });
    } catch (err) {
      console.error("[trainerExercisesRoutes] delete exercise failed", err);
      return res.status(500).json({ error: "failed" });
    }
  },
);

export default router;
