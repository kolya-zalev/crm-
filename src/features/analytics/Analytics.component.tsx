"use client";

import { AnalyticsTotals } from "./components/AnalyticsTotals";
import { StuckLeads } from "./components/StuckLeads/index";
import { ClosedByTable } from "./components/ClosedByTable/index";
import { AnalyticsComponentProps } from "./Analytics.types";

export const AnalyticsComponent = ({ analytics }: AnalyticsComponentProps) => {
  if (!analytics) return null;

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <AnalyticsTotals totals={analytics.totals} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StuckLeads stuck={analytics.stuck} />
        <ClosedByTable
          closedBy={analytics.closedBy}
          closedBeforeTracking={analytics.closedBeforeTracking}
        />
      </div>
    </div>
  );
};
