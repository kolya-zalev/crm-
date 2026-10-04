import { formatDistance } from "date-fns";

export const formatNotificationTime = (
  isoDate: string,
  now: Date = new Date(),
): string => {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return formatDistance(date, now, { addSuffix: true });
};