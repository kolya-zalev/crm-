import { render, screen } from "@testing-library/react";
import { StatCard } from "../components/StatCard";

const stats = {
  total: 10,
  new: 3,
  contacted: 2,
  qualified: 1,
  won: 7,
  lost: 4,
};

describe("StatCard", () => {
  it("renders all stat cards with titles", () => {
    render(<StatCard stats={stats} />);

    expect(screen.getByText("Total Leads")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Won")).toBeInTheDocument();
    expect(screen.getByText("Lost")).toBeInTheDocument();
  });

  it("renders stat values from stats prop", () => {
    render(<StatCard stats={stats} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
