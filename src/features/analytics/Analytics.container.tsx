"use client";

import { useLeadAnalytics } from "./hooks/useLeadAnalytics";
import { AnalyticsComponent } from "./Analytics.component";
import { Spinner } from "@/components/ui/spinner";

export const AnalyticsContainer = () => {
  const { analytics, isLoading, isError } = useLeadAnalytics();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2 p-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">
          You don't have access to this page.
        </p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col gap-2 p-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">No data yet.</p>
      </div>
    );
  }

  return (
    <AnalyticsComponent
      analytics={analytics}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
