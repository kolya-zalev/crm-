import { render, screen } from "@testing-library/react";
import { TeamMemberStatusBadge } from "../components/TeamMemberStatusBadge";

describe("TeamMemberStatusBadge", () => {
  it("renders active status badge", () => {
    render(<TeamMemberStatusBadge status="active" />);
    expect(screen.getByText("active")).toBeInTheDocument();
  });
  it("renders invited status badge", () => {
    render(<TeamMemberStatusBadge status="invited" />);
    expect(screen.getByText("invited")).toBeInTheDocument();
  });
  it("renders disabled status badge", () => {
    render(<TeamMemberStatusBadge status="disabled" />);
    expect(screen.getByText("disabled")).toBeInTheDocument();
  });
});
