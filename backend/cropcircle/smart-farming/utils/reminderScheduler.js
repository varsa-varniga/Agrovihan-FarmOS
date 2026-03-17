import FarmerCrop from "../models/FarmerCrop.js";
import { addDays, toDateKey, toDateOnly } from "./dateUtils.js";

const sendPushNotification = (farmerId, message) => {
  // TODO: integrate push notification provider
  console.log(`[PUSH] ${farmerId}: ${message}`);
};

const checkMissedTasks = async () => {
  const today = toDateOnly(new Date());
  const yesterday = addDays(today, -1);
  const yesterdayKey = toDateKey(yesterday);

  const farmerCrops = await FarmerCrop.find({
    "daily_tasks.completed": false,
  });

  farmerCrops.forEach((crop) => {
    const missedTasks = crop.daily_tasks.filter(
      (task) =>
        !task.completed && toDateKey(task.date) === yesterdayKey
    );

    if (missedTasks.length) {
      console.log(
        `[Reminder] Farmer ${crop.farmer_id} missed ${missedTasks.length} tasks on ${yesterdayKey}`
      );
      sendPushNotification(
        crop.farmer_id,
        `You missed ${missedTasks.length} tasks yesterday. Check your smart farming plan.`
      );
    }
  });
};

const startDailyTaskReminder = () => {
  checkMissedTasks();

  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  setInterval(checkMissedTasks, ONE_DAY_MS);
};

export { startDailyTaskReminder };
