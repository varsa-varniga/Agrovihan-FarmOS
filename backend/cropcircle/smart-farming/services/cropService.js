import cropSchedules from "../data/cropSchedules.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_WEEK = 7;

const normalizeCropName = (cropName) =>
  String(cropName || "")
    .trim()
    .toLowerCase();

const resolveCropKey = (cropName) => {
  const normalized = normalizeCropName(cropName);
  if (!normalized) {
    return null;
  }

  return (
    Object.keys(cropSchedules).find(
      (key) => key.toLowerCase() === normalized
    ) || null
  );
};

const getCropSchedule = (cropName) => {
  const cropKey = resolveCropKey(cropName);
  return cropKey ? cropSchedules[cropKey] : null;
};

const getWeekTasks = (cropName, currentWeek) => {
  const schedule = getCropSchedule(cropName);
  if (!schedule) {
    return [];
  }

  const weekNumber = Number(currentWeek);
  if (!Number.isFinite(weekNumber) || weekNumber < 1) {
    return [];
  }

  const weekEntry = schedule.weekly_schedule.find(
    (entry) => entry.week === weekNumber
  );
  return weekEntry ? weekEntry.tasks : [];
};

const calculateCurrentWeek = (startDate, now = new Date()) => {
  const parsedStart = new Date(startDate);
  if (Number.isNaN(parsedStart.getTime())) {
    return null;
  }

  const diffMs = now.getTime() - parsedStart.getTime();
  if (diffMs < 0) {
    return 1;
  }

  return Math.floor(diffMs / (DAYS_PER_WEEK * MS_PER_DAY)) + 1;
};

const getTasksForDate = (cropName, startDate, now = new Date()) => {
  const schedule = getCropSchedule(cropName);
  if (!schedule) {
    return { current_week: null, tasks: [] };
  }

  const currentWeek = calculateCurrentWeek(startDate, now);
  if (!currentWeek) {
    return { current_week: null, tasks: [] };
  }

  if (currentWeek > schedule.duration_weeks) {
    return { current_week: currentWeek, tasks: [] };
  }

  return { current_week: currentWeek, tasks: getWeekTasks(cropName, currentWeek) };
};

export {
  getCropSchedule,
  getWeekTasks,
  calculateCurrentWeek,
  getTasksForDate,
};
