export const TaskSectionFilters = ["all", "overdue", "completed", "high"] as const;

export type TaskSectionFilter = (typeof TaskSectionFilters)[number];

export const TaskPriorityColors: Record<string, string> = {
  high: "text-red-600 bg-red-50",
  medium: "text-yellow-600 bg-yellow-50",
  low: "text-green-600 bg-green-50",
};
