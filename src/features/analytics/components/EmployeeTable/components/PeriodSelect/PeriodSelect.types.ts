import type { PeriodFilter } from "@/types/analytics";

export type PeriodSelectProps = {
  value: PeriodFilter;
  onChange: (period: PeriodFilter) => void;
};

export type PeriodSelectComponentProps = {
  value: PeriodFilter;
  onChange: (value: string) => void;
};
