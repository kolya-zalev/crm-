import { findTask } from "../utils/findTask";
import type { Task } from "@/types";

const tasks: Task[] = [
  {
    id: "1",
    leadId: "lead-1",
    title: "Task one",
    status: "pending",
    priority: "low",
    dueDate: "2026-07-26",
    createdAt: "2026-01-01",
  },
  {
    id: "2",
    leadId: "lead-1",
    title: "Task two",
    status: "completed",
    priority: "high",
    dueDate: "2026-07-27",
    createdAt: "2026-01-02",
  },
];

describe("findTask", () => {
  it("finds task by id", () => {
    expect(findTask(tasks, "2")).toEqual(tasks[1]);
  });

  it("returns undefined when task is not found", () => {
    expect(findTask(tasks, "999")).toBeUndefined();
  });
});
