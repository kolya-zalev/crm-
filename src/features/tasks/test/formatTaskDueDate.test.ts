import {
  dueLabel,
  formatTaskDueDate,
} from "../components/TaskDueText/utils/formatTaskDueDate";
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

describe("formatTaskDueDate", () => {
  it("formats ISO date as DD.MM.YYYY", () => {
    expect(formatTaskDueDate("2026-07-26")).toBe("26.07.2026");
  });

  it('returns dash for empty date', () => {
    expect(formatTaskDueDate("")).toBe("—");
  });
});

describe("dueLabel", () => {
  it('returns "Done" for completed tasks', () => {
    expect(dueLabel(defTask({ status: "completed" }))).toBe("Done");
  });

  it("returns formatted date for pending tasks", () => {
    expect(dueLabel(defTask({ dueDate: "2026-07-26T00:00:00.000Z" }))).toBe(
      "26.07.2026",
    );
  });
});
