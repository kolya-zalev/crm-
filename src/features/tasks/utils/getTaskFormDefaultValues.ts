import { Task } from "@/types";
import { TaskAddFormValues } from "@/validators";

export const getTaskFormDefaultValues = (
  editingTask?: Task,
): TaskAddFormValues => {
  if (!editingTask) {
    return { title: "", priority: "medium", dueDate: "" };
  }

  return {
    title: editingTask.title,
    priority: editingTask.priority,
    dueDate: editingTask.dueDate.split("T", 1)[0],
  };
};
