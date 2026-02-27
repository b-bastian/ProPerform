import express from "express";
import regenerateCodeRoutes from "./regenerateCodeRoutes.js";
import linkAthleteRoutes from "./linkAthleteRoutes.js";
import deleteTrainer from "./deleteTrainer.js";
import registerTrainer from "./registerTrainer.js";
import trainerVerifyCode from "./trainerVerifyCode.js";

const router = express.Router();

router.use(regenerateCodeRoutes);
router.use(linkAthleteRoutes);
router.use(deleteTrainer);
router.use(registerTrainer);
router.use(trainerVerifyCode);

export default router;
