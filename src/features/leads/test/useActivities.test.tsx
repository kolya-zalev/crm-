jest.mock("@/features/leads/api/activitiesApi");

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import activitiesApi from "@/features/leads/api/activitiesApi";
import { useActivities } from "../hooks/useActivities";

const leadId = "1";

const fakeActivity = {
  id: "activity-1",
  leadId,
  type: "note_added" as const,
  description: "Note added",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useActivities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch activities from API", async () => {
    (activitiesApi.getActivitiesByLead as jest.Mock).mockResolvedValue([
      fakeActivity,
    ]);

    const { result } = renderHook(() => useActivities(leadId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.activities).toEqual([fakeActivity]);
    expect(activitiesApi.getActivitiesByLead).toHaveBeenCalledTimes(1);
    expect(activitiesApi.getActivitiesByLead).toHaveBeenCalledWith(leadId);
  });
});
