import express from "express";
import {
  startCropPlan,
  getTodayTasks,
  completeTask,
  getPendingTasks,
} from "../controllers/smartFarmingController.js";

const router = express.Router();

router.post("/start", startCropPlan);
router.get("/tasks/:farmer_id", getTodayTasks);
router.post("/complete", completeTask);
router.get("/pending/:farmer_id", getPendingTasks);

export default router;
