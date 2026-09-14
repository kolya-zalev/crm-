import { render, screen } from "@testing-library/react";
import { LeadsStatusBadge } from "../components/LeadsStatusBadge/LeadsStatusBadge.component";

describe("LeadsStatusBadge", () => {
  it("should render the lead status badge", () => {
    render(<LeadsStatusBadge status="new" />);
    expect(screen.getByText("new")).toBeInTheDocument();
  });
  it("should render contacted status badge", () => {
    render(<LeadsStatusBadge status="contacted" />);
    expect(screen.getByText("contacted")).toBeInTheDocument();
  });
});
