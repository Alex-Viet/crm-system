export const calculateMedian = (times: number[]) => {
  if (times.length === 0) return NaN;

  const sortedTimes = [...times].sort((a, b) => a - b);
  const middle = Math.floor(sortedTimes.length / 2);

  if (sortedTimes.length % 2 === 0) {
    return (sortedTimes[middle - 1] + sortedTimes[middle]) / 2;
  } else {
    return sortedTimes[middle];
  }
};
