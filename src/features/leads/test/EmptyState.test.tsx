import { render, screen } from "@testing-library/react";
import { EmptyState } from "../components/EmptyState/EmptyState";

describe("EmptyState", () => {
  it("should render the empty state", () => {
    render(<EmptyState />);
    expect(screen.getByText("No leads found")).toBeInTheDocument();
  });
});
