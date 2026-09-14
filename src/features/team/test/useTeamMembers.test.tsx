jest.mock("@/features/team/api/teamApi");

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import teamApi from "@/features/team/api/teamApi";
import { useTeamMembers } from "../hooks/useTeamMembers";

const fakeMember = {
  id: "1",
  name: "Maria",
  email: "maria@test.com",
  role: "admin",
  status: "active",
};

const fakeInvitedMember = {
  id: "2",
  name: "",
  email: "test@gmail.com",
  role: "admin",
  status: "invited",
};
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTeamMembers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (teamApi.getMembers as jest.Mock).mockResolvedValue([]);
  });

  it("loads members from API", async () => {
    (teamApi.getMembers as jest.Mock).mockResolvedValue([fakeMember]);

    const { result } = renderHook(() => useTeamMembers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.members).toEqual([fakeMember]);
    expect(teamApi.getMembers).toHaveBeenCalledTimes(1);
  });

  it("returns empty array while loading", () => {
    (teamApi.getMembers as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useTeamMembers(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.members).toEqual([]);
  });

  it("inviteMember calls API", async () => {
    (teamApi.inviteMember as jest.Mock).mockResolvedValue(fakeInvitedMember);

    const { result } = renderHook(() => useTeamMembers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await expect(
      result.current.inviteMember("test@gmail.com", "admin"),
    ).resolves.toEqual(fakeInvitedMember);

    expect(teamApi.inviteMember).toHaveBeenCalledWith(
      "test@gmail.com",
      "admin",
    );
  });

  it("inviteMember refetches members", async () => {
    (teamApi.getMembers as jest.Mock)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([fakeInvitedMember]);
    (teamApi.inviteMember as jest.Mock).mockResolvedValue(fakeInvitedMember);

    const { result } = renderHook(() => useTeamMembers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.inviteMember("test@gmail.com", "admin");

    await waitFor(() =>
      expect(result.current.members).toEqual([fakeInvitedMember]),
    );
    expect(teamApi.getMembers).toHaveBeenCalledTimes(2);
    expect(teamApi.inviteMember).toHaveBeenCalledWith(
      "test@gmail.com",
      "admin",
    );
  });

  it("updateMember calls API", async () => {
    const updated = { ...fakeMember, status: "disabled" as const };
    (teamApi.updateMember as jest.Mock).mockResolvedValue(updated);

    const { result } = renderHook(() => useTeamMembers(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.updateMember("1", { status: "disabled" });

    expect(teamApi.updateMember).toHaveBeenCalledWith("1", {
      status: "disabled",
    });
  });
});
