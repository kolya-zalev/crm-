jest.mock("../hooks/useTeamMembers", () => ({
  useTeamMembers: jest.fn(),
}));
jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { TeamContainer } from "../Team.container";

describe("TeamContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("invite success", async () => {
    const inviteMember = jest.fn().mockResolvedValue({});
    (useTeamMembers as jest.Mock).mockReturnValue({
      members: [],
      isLoading: false,
      isInviting: false,
      inviteMember,
      updateMember: jest.fn().mockResolvedValue({}),
    });

    const user = userEvent.setup();
    render(<TeamContainer />);

    await user.click(screen.getByRole("button", { name: "Invite user" }));
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "test@gmail.com",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Role" }),
      "manager",
    );
    await user.click(screen.getByRole("button", { name: "Send invite" }));

    expect(inviteMember).toHaveBeenCalledWith("test@gmail.com", "manager");
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Invite sent successfully");
    });
  });
});
