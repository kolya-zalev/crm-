jest.mock("@/features/leads/api/leadsApi");

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import leadsApi from "@/features/leads/api/leadsApi";
import { useLead } from "../hooks/useLead";

const fakeLead = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  company: "Example Inc.",
  status: "new" as const,
  phone: "1234567890",
  tags: ["tag1", "tag2"],
  notes: "Notes",
  source: "Source",
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLead", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch lead id from API", async () => {
    (leadsApi.getLeadById as jest.Mock).mockResolvedValue(fakeLead);

    const { result } = renderHook(() => useLead(fakeLead.id), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.lead).toEqual(fakeLead);
    expect(leadsApi.getLeadById).toHaveBeenCalledTimes(1);
    expect(leadsApi.getLeadById).toHaveBeenCalledWith(fakeLead.id);
  });
});
