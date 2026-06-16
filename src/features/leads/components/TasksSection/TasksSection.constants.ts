export const TaskFilters = ["all", "overdue", "completed", "high"] as const;

export type TaskFilter = (typeof TaskFilters)[number];

export const TaskFormDefaultValues = {
  title: "",
  priority: "medium" as const,
  dueDate: "",
};
