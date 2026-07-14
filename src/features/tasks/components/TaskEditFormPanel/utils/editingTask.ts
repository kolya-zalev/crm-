import { findTask } from "@/features/tasks/utils/findTask";
import { Task } from "@/types";

export const editingTask = (allTasks: Task[], editingTaskId: string | null) => {
  return findTask(allTasks, editingTaskId ?? "");
};