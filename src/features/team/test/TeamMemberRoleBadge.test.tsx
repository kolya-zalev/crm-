import { render, screen } from "@testing-library/react";
import { TeamMemberRoleBadge } from "../components/TeamMemberRoleBadge";

describe("TeamMemberRoleBadge", () => {
  it("renders admin role badge", () => {
    render(<TeamMemberRoleBadge role="admin" />);
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("admin")).toHaveClass(
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300", // ???
    );
  });
  it("renders manager role badge", () => {
    render(<TeamMemberRoleBadge role="manager" />);
    expect(screen.getByText("manager")).toBeInTheDocument();
  });
  it("renders member role badge", () => {
    render(<TeamMemberRoleBadge role="member" />);
    expect(screen.getByText("member")).toBeInTheDocument();
  });
});
