import { render, screen } from "@testing-library/react";
import { DayTaskList } from "../components/DayTaskList";
import { Task } from "@/types";

const getLeadName = (id: string) =>
  id === "lead-1" ? "John Doe" : "Lead not found";

export const defTask = (overrides: Partial<Task> = {}): Task => ({
  id: "1",
  leadId: "lead-1",
  title: "Call client",
  status: "pending",
  priority: "medium",
  dueDate: "2026-07-26",
  createdAt: "2026-01-01",
  ...overrides,
});

describe("DayTaskList", () => {
  it("no tasks renders empty list", () => {
    render(
      <DayTaskList
        tasks={[]}
        selected={new Date(2026, 7, 3)}
        getLeadName={getLeadName}
      />,
    );
    expect(screen.getByText("No tasks for this day.")).toBeInTheDocument();
  });
  it("shows tasks and lead link", () => {
    render(
      <DayTaskList
        tasks={[defTask({ title: " Call", leadId: "lead-1" })]}
        selected={new Date(2026, 7, 3)}
        getLeadName={getLeadName}
      />,
    );
    expect(screen.getByText("Call")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "John Doe" })).toHaveAttribute(
      "href",
      "/lead/lead-1",
    );
  });
});
