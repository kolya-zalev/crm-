import {
  addDays,
  addMonths,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  subDays,
  subMonths,
} from "date-fns";
import type { PeriodFilter } from "@/types/analytics";
import type { PeriodRange } from "@/types/analytics";

export const periodOptions: { value: PeriodFilter; label: string }[] = [
  { value: "this_month", label: "This Month" },
  { value: "previous_month", label: "Previous Month" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "this_quarter", label: "This Quarter" },
];

export const getPeriodRange = (
  filter: PeriodFilter,
  now = new Date(),
): PeriodRange => {
  const monthStart = startOfMonth(now);
  const today = startOfDay(now);

  let from: Date;
  let to: Date;

  switch (filter) {
    case "this_month":
      from = monthStart;
      to = addMonths(monthStart, 1);
      break;
    case "previous_month":
      from = subMonths(monthStart, 1);
      to = monthStart;
      break;
    case "last_30_days":
      from = subDays(today, 29);
      to = addDays(today, 1);
      break;
    case "this_quarter": {
      const quarterStart = startOfQuarter(now);
      from = quarterStart;
      to = addMonths(quarterStart, 3);
      break;
    }
  }

  return { from: from.toISOString(), to: to.toISOString() };
};
