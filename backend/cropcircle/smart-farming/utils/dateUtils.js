const toDateOnly = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const addDays = (value, days) => {
  const dateOnly = toDateOnly(value);
  if (!dateOnly) return null;
  const result = new Date(dateOnly);
  result.setDate(result.getDate() + days);
  return result;
};

const toDateKey = (value) => {
  const dateOnly = toDateOnly(value);
  if (!dateOnly) return null;
  const year = dateOnly.getFullYear();
  const month = String(dateOnly.getMonth() + 1).padStart(2, "0");
  const day = String(dateOnly.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export { toDateOnly, addDays, toDateKey };
