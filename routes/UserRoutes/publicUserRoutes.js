import express from "express";
import bcrypt from "bcrypt";
import { db } from "../../db.js";

const router = express.Router();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// DB-Test
router.get("/dbtest", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT NOW() AS now");
    res.json({
      databaseTime: rows[0].now,
      status: "✅ DB Verbindung erfolgreich",
    });
  } catch (error) {
    res.status(500).json({
      error: "Datenbankverbindung fehlgeschlagen",
      details: error.message,
    });
  }
});

export default router;
