import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TeamTable } from "../components/TeamTable";
const fakeMember = {
  id: "1",
  name: "Maria",
  email: "maria@test.com",
  role: "admin" as const,
  status: "active" as const,
};
const fakeInvitedMember = {
  id: "2",
  name: "",
  email: "invited@test.com",
  role: "manager" as const,
  status: "invited" as const,
};

describe("TeamTable", () => {
  it("shows loading state without empty message or empty data", () => {
    render(<TeamTable members={[]} isLoading={true} onDisable={jest.fn()} />);
    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("No team members yet")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Disable" }),
    ).not.toBeInTheDocument();
  });
  it("shows empty state", () => {
    render(<TeamTable members={[]} isLoading={false} onDisable={jest.fn()} />);
    expect(screen.getByText("No team members yet")).toBeInTheDocument();
  });
  it("renders member data", () => {
    render(
      <TeamTable
        members={[fakeMember]}
        isLoading={false}
        onDisable={jest.fn()}
      />,
    );
    expect(screen.getByText("maria@test.com")).toBeInTheDocument();
    expect(screen.getByText("Maria")).toBeInTheDocument();
  });
  it("shows dash when name is empty", () => {
    render(
      <TeamTable
        members={[fakeInvitedMember]}
        isLoading={false}
        onDisable={jest.fn()}
      />,
    );
    expect(screen.getByText("-")).toBeInTheDocument();
  });
  it("shows diable for active members", () => {
    render(
      <TeamTable
        members={[fakeMember]}
        isLoading={false}
        onDisable={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Disable" }));
  });
  it("hides disable for invited member", () => {
    render(
      <TeamTable
        members={[fakeInvitedMember]}
        isLoading={false}
        onDisable={jest.fn()}
      />,
    );
    expect(
      screen.queryByRole("button", { name: "Disable" }),
    ).not.toBeInTheDocument();
  });
  it("calls onDisable with member id", async () => {
    const onDisable = jest.fn();
    const user = userEvent.setup();
    render(
      <TeamTable
        members={[fakeMember]}
        isLoading={false}
        onDisable={onDisable}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Disable" }));
    expect(onDisable).toHaveBeenCalledWith("1");
  });
});
