import { isTaskOverdue } from "@/features/tasks/utils/filterTasks";
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

describe("isTaskOverdue", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-07-26T12:00:00.000Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns false for completed tasks", () => {
    expect(isTaskOverdue(defTask({ status: "completed" }))).toBe(false);
  });

  it("returns true for pending tasks with past due date", () => {
    expect(isTaskOverdue(defTask({ dueDate: "2026-07-25" }))).toBe(true);
  });

  it("returns false for pending tasks due today or later", () => {
    expect(isTaskOverdue(defTask({ dueDate: "2026-07-26" }))).toBe(false);
  });
});
