export const TaskFilters = ["all", "overdue", "completed", "high"] as const;

export const TaskPriorityColors = {
  low: "text-green-500 bg-green-50",
  medium: "text-yellow-500 bg-yellow-50",
  high: "text-red-500 bg-red-50",
} as const;
