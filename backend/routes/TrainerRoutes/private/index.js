import express from "express";
import regenerateCodeRoutes from "./regenerateCodeRoutes.js";
import linkAthleteRoutes from "./linkAthleteRoutes.js";
import deleteTrainer from "./deleteTrainer.js";
import deleteTrainerToUser from "./deleteTrainerToUser.js";
import trainerAthleteRoutes from "./trainerAthleteRoutes.js";
import trainersMe from "./trainersMe.js";
import TrainerToUserRoutes from "./TrainerToUserRoutes.js";
import UserRequestTrainerCode from "./UserRequestTrainerCode.js";
import trainerRequestsRoutes from "./trainerRequestsRoutes.js";
import trainerExercisesRoutes from "./trainerExercisesRoutes.js";
import trainerTrainingPlanRoutes from "./trainerTrainingPlanRoutes.js";

const router = express.Router();

router.use(regenerateCodeRoutes);
router.use(linkAthleteRoutes);
router.use(deleteTrainerToUser);
router.use(deleteTrainer);
router.use(trainerAthleteRoutes);
router.use(trainersMe);
router.use(TrainerToUserRoutes);
router.use(UserRequestTrainerCode);
router.use(trainerRequestsRoutes);
router.use(trainerExercisesRoutes);
router.use(trainerTrainingPlanRoutes);

export default router;
