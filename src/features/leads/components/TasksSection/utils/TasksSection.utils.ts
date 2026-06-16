import { Task } from "@/hooks/types";
import { isTaskOverdue } from "@/features/tasks/utils/filterTasks";
import { TaskFilter } from "../TasksSection.constants";

export const filterLeadTasks = (
  tasks: Task[],
  activeFilter: TaskFilter,
): Task[] => {
  return tasks.filter((task) => {
    switch (activeFilter) {
      case "completed":
        return task.status === "completed";
      case "high":
        return task.priority === "high";
      case "overdue":
        return isTaskOverdue(task);
      case "all":
      default:
        return true;
    }
  });
};
