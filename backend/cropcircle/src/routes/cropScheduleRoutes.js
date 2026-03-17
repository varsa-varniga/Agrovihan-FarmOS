import express from "express";
import {
  getScheduleByCrop,
  getTasksForWeek,
  getCurrentWeekTasks,
} from "../controllers/cropScheduleController.js";

const router = express.Router();

// Full schedule for a crop
router.get("/schedule/:crop_name", getScheduleByCrop);

// Tasks for a specific week
router.get("/schedule/:crop_name/week/:current_week", getTasksForWeek);

// Current week tasks based on start date
router.post("/current-week", getCurrentWeekTasks);

export default router;
