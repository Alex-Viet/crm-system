export const getWorkWeekNumber = (date: Date): number => {
  const actualDate = new Date(date);
  actualDate.setHours(actualDate.getHours() - 11);

  const startOfYear = new Date(actualDate.getFullYear(), 0, 1);

  const days = Math.floor(
    (actualDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );

  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
};
