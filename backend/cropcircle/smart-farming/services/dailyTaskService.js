import { getCropSchedule } from "./cropService.js";
import { addDays, toDateOnly } from "../utils/dateUtils.js";

const FREQUENCY_DAILY = "daily";
const FREQUENCY_WEEKLY = "weekly";
const FREQUENCY_ONCE = "once";

const normalizeFrequency = (value) =>
  String(value || "").trim().toLowerCase();

const generateDailyTasksForCrop = (cropName, startDate) => {
  const schedule = getCropSchedule(cropName);
  if (!schedule) {
    throw new Error("Crop schedule not found");
  }

  const normalizedStart = toDateOnly(startDate);
  if (!normalizedStart) {
    throw new Error("Invalid start date");
  }

  const dailyTasks = [];

  schedule.weekly_schedule.forEach((week) => {
    const weekOffset = (week.week - 1) * 7;

    week.tasks.forEach((task) => {
      const frequency = normalizeFrequency(task.frequency);

      if (frequency === FREQUENCY_DAILY) {
        for (let day = 0; day < 7; day += 1) {
          const taskDate = addDays(normalizedStart, weekOffset + day);
          dailyTasks.push({
            task_name: task.task_name,
            date: taskDate,
            completed: false,
            priority: task.priority,
          });
        }
      } else if (
        frequency === FREQUENCY_WEEKLY ||
        frequency === FREQUENCY_ONCE
      ) {
        const taskDate = addDays(normalizedStart, weekOffset);
        dailyTasks.push({
          task_name: task.task_name,
          date: taskDate,
          completed: false,
          priority: task.priority,
        });
      }
    });
  });

  return dailyTasks;
};

export { generateDailyTasksForCrop };
