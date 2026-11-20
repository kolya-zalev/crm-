export const formatDays = (days: number | null) => {
  if (days === null) return "No data";

  const minutes = days * 24 * 60;
  if (minutes < 60) return `${Math.round(minutes)} min`;

  const hours = days * 24;
  if (hours < 24) return `${hours.toFixed(1)} h`;

  return `${days.toFixed(1)}d`;
};

export const formatWinRate = (rate: number | null) =>
  rate === null ? "No data" : `${rate}%`;
