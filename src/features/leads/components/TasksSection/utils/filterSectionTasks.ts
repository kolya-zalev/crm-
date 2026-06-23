import type { Task } from "@/types";
import type { TaskSectionFilter } from "../TasksSection.constants";

export const isTaskOverdue = (task: Task) =>
  task.status === "pending" && new Date(task.dueDate) < new Date();

export const filterSectionTasks = (tasks: Task[], filter: TaskSectionFilter) => {
  switch (filter) {
    case "completed":
      return tasks.filter((task) => task.status === "completed");
    case "high":
      return tasks.filter((task) => task.priority === "high");
    case "overdue":
      return tasks.filter(isTaskOverdue);
    default:
      return tasks;
  }
};
