import {
  getCropSchedule,
  getWeekTasks,
  getTasksForDate,
} from "../../smart-farming/services/cropService.js";

export const getScheduleByCrop = (req, res) => {
  const { crop_name } = req.params;
  const schedule = getCropSchedule(crop_name);

  if (!schedule) {
    return res.status(404).json({ message: "Crop schedule not found" });
  }

  return res.json(schedule);
};

export const getTasksForWeek = (req, res) => {
  const { crop_name, current_week } = req.params;
  const schedule = getCropSchedule(crop_name);

  if (!schedule) {
    return res.status(404).json({ message: "Crop schedule not found" });
  }

  const weekNumber = Number(current_week);
  if (!Number.isFinite(weekNumber) || weekNumber < 1) {
    return res.status(400).json({ message: "Invalid current_week" });
  }

  if (weekNumber > schedule.duration_weeks) {
    return res.status(400).json({ message: "Week exceeds crop duration" });
  }

  const tasks = getWeekTasks(crop_name, weekNumber);
  return res.json({
    crop_name: schedule.crop_name,
    current_week: weekNumber,
    tasks,
  });
};

export const getCurrentWeekTasks = (req, res) => {
  const { crop_name, start_date } = req.body;
  const schedule = getCropSchedule(crop_name);

  if (!schedule) {
    return res.status(404).json({ message: "Crop schedule not found" });
  }

  const result = getTasksForDate(crop_name, start_date);
  if (!result.current_week) {
    return res.status(400).json({ message: "Invalid start_date" });
  }

  return res.json({
    crop_name: schedule.crop_name,
    current_week: result.current_week,
    duration_weeks: schedule.duration_weeks,
    tasks: result.tasks,
  });
};
