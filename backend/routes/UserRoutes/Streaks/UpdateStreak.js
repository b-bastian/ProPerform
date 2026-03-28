import express from "express";
import { db } from "../../../db.js";
import { requireAuth } from "../../../middleware/auth.js";

const router = express.Router();

// helper ohne UTC bug
function getYesterday(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  return date.toLocaleDateString("en-CA");
}

router.post("/update", requireAuth, async (req, res) => {
  const uid = req.user.uid;
  const { type, date } = req.body;

  if (!type) {
    return res.status(400).json({ message: "type is required." });
  }

  try {
    // dev override
    const today =
      process.env.NODE_ENV === "development" && date
        ? date
        : new Date().toLocaleDateString("en-CA");

    // insert log (1 pro tag dank UNIQUE)
    const [logResult] = await db.query(
      `
      INSERT IGNORE INTO streak_logs (uid, type, activity_date)
      VALUES (?, ?, ?)
      `,
      [uid, type, today],
    );

    const [rows] = await db.query(
      `
      SELECT * FROM streaks 
      WHERE uid = ? AND type = ?
      `,
      [uid, type],
    );

    // initial erstellen
    if (!rows.length) {
      await db.query(
        `
        INSERT INTO streaks (uid, type, current_streak, longest_streak, last_activity_date)
        VALUES (?, ?, 1, 1, ?)
        `,
        [uid, type, today],
      );

      return res.status(200).json({
        message: "streak created.",
        current_streak: 1,
        longest_streak: 1,
      });
    }

    const streak = rows[0];

    if (logResult.affectedRows === 0) {
      return res.status(200).json({
        message: "streak already updated today.",
        current_streak: streak.current_streak,
        longest_streak: streak.longest_streak,
      });
    }

    const yest = getYesterday(today);

    let newCurrent = 1;

    if (streak.last_activity_date) {
      const last = streak.last_activity_date;

      if (last === yest) {
        newCurrent = streak.current_streak + 1;
      }
    }

    const newLongest = Math.max(newCurrent, streak.longest_streak);

    await db.query(
      `
      UPDATE streaks
      SET current_streak = ?, longest_streak = ?, last_activity_date = ?
      WHERE uid = ? AND type = ?
      `,
      [newCurrent, newLongest, today, uid, type],
    );

    return res.status(200).json({
      message: "streak updated successfully.",
      current_streak: newCurrent,
      longest_streak: newLongest,
    });
  } catch (err) {
    console.log("update streak error.", err);
    return res
      .status(500)
      .json({ message: "server error.", error: err.message });
  }
});

export default router;
