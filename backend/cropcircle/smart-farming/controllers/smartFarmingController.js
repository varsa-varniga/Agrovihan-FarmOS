import FarmerCrop from "../models/FarmerCrop.js";
import { generateDailyTasksForCrop } from "../services/dailyTaskService.js";
import { toDateOnly, toDateKey, addDays } from "../utils/dateUtils.js";

const startCropPlan = async (req, res) => {
  try {
    const { farmer_id, crop_name, start_date } = req.body;

    if (!farmer_id || !crop_name || !start_date) {
      return res.status(400).json({
        message: "farmer_id, crop_name, and start_date are required",
      });
    }

    const dailyTasks = generateDailyTasksForCrop(crop_name, start_date);
    const normalizedStart = toDateOnly(start_date);

    const farmerCrop = await FarmerCrop.findOneAndUpdate(
      { farmer_id, crop_name },
      {
        farmer_id,
        crop_name,
        start_date: normalizedStart,
        daily_tasks: dailyTasks,
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      message: "Smart farming plan initialized",
      farmer_id: farmerCrop.farmer_id,
      crop_name: farmerCrop.crop_name,
      start_date: farmerCrop.start_date,
      total_tasks: farmerCrop.daily_tasks.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTodayTasks = async (req, res) => {
  try {
    const { farmer_id } = req.params;
    const farmerCrop = await FarmerCrop.findOne({ farmer_id });

    if (!farmerCrop) {
      return res.status(404).json({ message: "Farmer crop plan not found" });
    }

    const todayKey = toDateKey(new Date());
    const tasks = farmerCrop.daily_tasks.filter(
      (task) => toDateKey(task.date) === todayKey
    );

    return res.json({
      farmer_id,
      crop_name: farmerCrop.crop_name,
      date: todayKey,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { farmer_id, task_name, date } = req.body;

    if (!farmer_id || !task_name || !date) {
      return res
        .status(400)
        .json({ message: "farmer_id, task_name, and date are required" });
    }

    const normalizedDate = toDateOnly(date);
    if (!normalizedDate) {
      return res.status(400).json({ message: "Invalid date" });
    }

    const updateResult = await FarmerCrop.updateOne(
      { farmer_id },
      { $set: { "daily_tasks.$[task].completed": true } },
      {
        arrayFilters: [
          { "task.task_name": task_name, "task.date": normalizedDate },
        ],
      }
    );

    if (!updateResult.modifiedCount) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task marked as completed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPendingTasks = async (req, res) => {
  try {
    const { farmer_id } = req.params;
    const farmerCrop = await FarmerCrop.findOne({ farmer_id });

    if (!farmerCrop) {
      return res.status(404).json({ message: "Farmer crop plan not found" });
    }

    const today = toDateOnly(new Date());
    const cutoff = addDays(today, -1);
    const pending = farmerCrop.daily_tasks.filter(
      (task) =>
        !task.completed && toDateOnly(task.date).getTime() < cutoff.getTime()
    );

    return res.json({
      farmer_id,
      crop_name: farmerCrop.crop_name,
      overdue_count: pending.length,
      tasks: pending,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { startCropPlan, getTodayTasks, completeTask, getPendingTasks };
