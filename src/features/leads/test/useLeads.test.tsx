jest.mock("@/features/leads/api/leadsApi");

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import leadsApi from "@/features/leads/api/leadsApi";
import { useLeads } from "../hooks/useLeads";

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

const createLeadData = {
  name: fakeLead.name,
  email: fakeLead.email,
  company: fakeLead.company,
  status: fakeLead.status,
  phone: fakeLead.phone,
  tags: fakeLead.tags,
  notes: fakeLead.notes,
  source: fakeLead.source,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLeads", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (leadsApi.getLeads as jest.Mock).mockResolvedValue([]);
  });

  it("loads leads from API", async () => {
    (leadsApi.getLeads as jest.Mock).mockResolvedValue([fakeLead]);

    const { result } = renderHook(() => useLeads(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.leads).toEqual([fakeLead]);
    expect(leadsApi.getLeads).toHaveBeenCalledTimes(1);
  });

  it("createLead calls API and refetches leads", async () => {
    (leadsApi.getLeads as jest.Mock)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([fakeLead]);
    (leadsApi.createLead as jest.Mock).mockResolvedValue(fakeLead);

    const { result } = renderHook(() => useLeads(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.createLead(createLeadData);

    await waitFor(() => expect(result.current.leads).toEqual([fakeLead]));
    expect(leadsApi.createLead).toHaveBeenCalledWith(createLeadData);
    expect(leadsApi.getLeads).toHaveBeenCalledTimes(2);
  });

  it("deleteLead calls API and refetches leads", async () => {
    (leadsApi.getLeads as jest.Mock)
      .mockResolvedValueOnce([fakeLead])
      .mockResolvedValueOnce([]);
    (leadsApi.deleteLead as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLeads(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.deleteLead(fakeLead.id);

    await waitFor(() => expect(result.current.leads).toEqual([]));
    expect(leadsApi.deleteLead).toHaveBeenCalledWith(fakeLead.id);
    expect(leadsApi.getLeads).toHaveBeenCalledTimes(2);
  });

  it("updateLead calls API", async () => {
    (leadsApi.updateLead as jest.Mock).mockResolvedValue(fakeLead);

    const { result } = renderHook(() => useLeads(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.updateLead(fakeLead.id, { name: "Updated Name" });

    expect(leadsApi.updateLead).toHaveBeenCalledWith(fakeLead.id, {
      name: "Updated Name",
    });
  });
});
