import { getTaskFormDefaultValues } from "../utils/getTaskFormDefaultValues";
import type { Task } from "@/types";

const task: Task = {
  id: "1",
  leadId: "lead-1",
  title: "Call client",
  status: "pending",
  priority: "high",
  dueDate: "2026-07-26T15:00:00.000Z",
  createdAt: "2026-01-01",
};

describe("getTaskFormDefaultValues", () => {
  it("returns empty defaults for new task", () => {
    expect(getTaskFormDefaultValues()).toEqual({
      title: "",
      priority: "medium",
      dueDate: "",
    });
  });

  it("returns task values for edit mode", () => {
    expect(getTaskFormDefaultValues(task)).toEqual({
      title: "Call client",
      priority: "high",
      dueDate: "2026-07-26",
    });
  });
});
