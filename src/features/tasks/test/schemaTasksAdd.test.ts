import { schemaTasksAdd } from "@/validators/tasks";

const validTask = {
  title: "Test Task",
  priority: "low" as const,
  dueDate: "2026-07-26",
};

describe("schemaTasksAdd", () => {
  it("valid data passes", () => {
    expect(schemaTasksAdd.safeParse(validTask).success).toBe(true);
  });

  it("empty title fails", () => {
    const result = schemaTasksAdd.safeParse({ ...validTask, title: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid title");
    }
  });

  it("empty dueDate fails", () => {
    const result = schemaTasksAdd.safeParse({ ...validTask, dueDate: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Due date is required");
    }
  });
});
