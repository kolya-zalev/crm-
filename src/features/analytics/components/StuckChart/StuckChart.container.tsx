"use client";

import { StuckChartComponent } from "./StuckChart.component";
import type { StuckChartContainerProps } from "./StuckChart.types";

export const StuckChartContainer = ({ stuck }: StuckChartContainerProps) => {
  const data = Object.entries(stuck.byStatus).map(([status, count]) => ({
    status,
    count,
  }));
  const hasStuck = data.some((slice) => slice.count > 0);

  return (
    <StuckChartComponent
      data={data}
      hasStuck={hasStuck}
      thresholdDays={stuck.thresholdDays}
    />
  );
};
