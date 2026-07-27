import { filterTasks } from "@/features/tasks/utils/filterTasks";
import type { Task } from "@/types";

const defTask = (overrides: Partial<Task> = {}): Task => ({
  id: "1",
  leadId: "lead-1",
  title: "Call client",
  status: "pending",
  priority: "medium",
  dueDate: "2026-07-26",
  createdAt: "2026-01-01",
  ...overrides,
});

describe("filterTasks", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-07-26T12:00:00.000Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns all tasks for filter "all"', () => {
    const tasks = [defTask({ id: "1" }), defTask({ id: "2" })];
    expect(filterTasks(tasks, "all")).toHaveLength(2);
  });

  it("filters completed tasks", () => {
    const tasks = [
      defTask({ id: "1", status: "completed" }),
      defTask({ id: "2", status: "pending" }),
    ];
    expect(filterTasks(tasks, "completed")).toEqual([tasks[0]]);
  });

  it("filters high priority tasks", () => {
    const tasks = [
      defTask({ id: "1", priority: "high" }),
      defTask({ id: "2", priority: "low" }),
    ];
    expect(filterTasks(tasks, "high")).toEqual([tasks[0]]);
  });

  it("filters overdue tasks", () => {
    const tasks = [
      defTask({ id: "1", dueDate: "2026-07-25" }),
      defTask({ id: "2", dueDate: "2026-07-27" }),
    ];
    expect(filterTasks(tasks, "overdue")).toEqual([tasks[0]]);
  });
});
