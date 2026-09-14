"use client";

import { AnalyticsTotals } from "./components/AnalyticsTotals";
import { ClosedByChart } from "./components/ClosedByChart";
import { StuckChart } from "./components/StuckChart";
import { AnalyticsComponentProps } from "./Analytics.types";
import { UnassignedLeads } from "./components/UnassignedLeads";

export const AnalyticsComponent = ({ analytics }: AnalyticsComponentProps) => {
  if (!analytics) return null;

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <AnalyticsTotals totals={analytics.totals} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClosedByChart closedBy={analytics.closedBy} />
        <StuckChart stuck={analytics.stuck} />
      </div>

      <UnassignedLeads unassigned={analytics.unassigned} />
    </div>
  );
};
