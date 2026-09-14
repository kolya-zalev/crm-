import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { TaskFiltersBar } from "../components/TaskFiltersBar";

describe("TaskFiltersBar", () => {
  it("renders all filter buttons", () => {
    render(<TaskFiltersBar activeFilter="all" onFilterChange={() => {}} />);

    expect(screen.getByRole("button", { name: "all" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "overdue" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "completed" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "high" })).toBeInTheDocument();
  });

  it("calls onFilterChange when filter clicked", async () => {
    const onFilterChange = jest.fn();
    const user = userEvent.setup();

    render(
      <TaskFiltersBar activeFilter="all" onFilterChange={onFilterChange} />,
    );

    await user.click(screen.getByRole("button", { name: "completed" }));

    expect(onFilterChange).toHaveBeenCalledWith("completed");
  });
});
