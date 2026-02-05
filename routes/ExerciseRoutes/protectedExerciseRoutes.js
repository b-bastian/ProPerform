import express from "express";
import bcrypt from "bcrypt";
import { db } from "../../db.js";
import jwt from "jsonwebtoken";

import { requireRole } from "../../middleware/role.js";
import { createRateLimiter } from "../../middleware/rate.js";

import crypto from "crypto";

const router = express.Router();

export default router;
