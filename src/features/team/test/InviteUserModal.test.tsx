import { InviteUserModal } from "../components/InviteUserModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("InviteUserModal", () => {
  it("doesnt show content when closed", () => {
    render(
      <InviteUserModal open={false} onClose={jest.fn()} onInvite={jest.fn()} />,
    );
    expect(screen.queryByText("Invite user")).not.toBeInTheDocument();
  });
  it("shows form when open", () => {
    render(
      <InviteUserModal open={true} onClose={jest.fn()} onInvite={jest.fn()} />,
    );
    expect(screen.getByText("Invite user")).toBeInTheDocument();
    expect(
      screen.getByText("Send an invitation by email and assign a role"),
    ).toBeInTheDocument();
  });
  it("doesnt submit invalid email", async () => {
    const user = userEvent.setup();
    const onInvite = jest.fn();
    render(
      <InviteUserModal open={true} onClose={jest.fn()} onInvite={onInvite} />,
    );
    await user.type(screen.getByRole("textbox", { name: "Email" }), "invalid");
    await user.click(screen.getByRole("button", { name: "Send invite" }));
    expect(onInvite).not.toHaveBeenCalled();
  });
  it("shows email validation error", async () => {
    const user = userEvent.setup();
    render(
      <InviteUserModal open={true} onClose={jest.fn()} onInvite={jest.fn()} />,
    );
    await user.click(screen.getByRole("button", { name: "Send invite" }));
    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();
  });
  it("sumbits valid form", async () => {
    const user = userEvent.setup();
    const onInvite = jest.fn();
    render(
      <InviteUserModal open={true} onClose={jest.fn()} onInvite={onInvite} />,
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "test@test.com",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Role" }),
      "Admin",
    );
    await user.click(screen.getByRole("button", { name: "Send invite" }));
    expect(onInvite).toHaveBeenCalledWith({
      email: "test@test.com",
      role: "admin",
    });
  });
  it("calls onClose when button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <InviteUserModal open={true} onClose={onClose} onInvite={jest.fn()} />,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });
  it("disables buttons while loading", () => {
    render(
      <InviteUserModal
        open={true}
        onClose={jest.fn()}
        onInvite={jest.fn()}
        isLoading={true}
      />,
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Close" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled();
  });
});
