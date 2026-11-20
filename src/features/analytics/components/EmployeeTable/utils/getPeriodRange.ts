import {
  addDays,
  addMonths,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  subDays,
  subMonths,
} from "date-fns";
import type { PeriodFilter, PeriodRange } from "@/types/analytics";

export const periodOptions: { value: PeriodFilter; label: string }[] = [
  { value: "this_month", label: "This Month" },
  { value: "previous_month", label: "Previous Month" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "this_quarter", label: "This Quarter" },
];

type Bounds = { from: Date; to: Date };

const RANGE_BY_FILTER: Record<PeriodFilter, (now: Date) => Bounds> = {
  this_month: (now) => {
    const from = startOfMonth(now);
    return { from, to: addMonths(from, 1) };
  },
  previous_month: (now) => {
    const to = startOfMonth(now);
    return { from: subMonths(to, 1), to };
  },
  last_30_days: (now) => {
    const today = startOfDay(now);
    return { from: subDays(today, 29), to: addDays(today, 1) };
  },
  this_quarter: (now) => {
    const from = startOfQuarter(now);
    return { from, to: addMonths(from, 3) };
  },
};

export const getPeriodRange = (
  filter: PeriodFilter,
  now = new Date(),
): PeriodRange => {
  const { from, to } = RANGE_BY_FILTER[filter](now);
  return { from: from.toISOString(), to: to.toISOString() };
};
