import { TaskFilters } from "./tasksColors";
import { Task } from "@/types";

export type TaskFilterValue = (typeof TaskFilters)[number];

const todayDay = () => new Date().toISOString().split("T", 1)[0];

export const isTaskOverdue = (task: Task) => {
  if (task.status !== "pending") return false;
  return task.dueDate.split("T", 1)[0] < todayDay();
};

export const filterTasks = (tasks: Task[], filter: TaskFilterValue) => {
  switch (filter) {
    case "all":
      return tasks;
    case "completed":
      return tasks.filter((task) => task.status === "completed");
    case "high":
      return tasks.filter((task) => task.priority === "high");
    case "overdue":
      return tasks.filter((task) => isTaskOverdue(task));
  }
};
