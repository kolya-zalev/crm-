import type { Analytics } from "@/types/analytics";

export type StuckSlice = {
  status: string;
  count: number;
};

export type StuckChartContainerProps = {
  stuck: Analytics["stuck"];
};

export type StuckChartComponentProps = {
  data: StuckSlice[];
  hasStuck: boolean;
  thresholdDays: number;
};
