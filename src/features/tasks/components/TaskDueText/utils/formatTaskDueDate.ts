import { Task } from "@/types/task.types";

export const formatTaskDueDate = (dueDate: string) => {
  if (!dueDate) return "—";
  const [year, month, day] = dueDate.split("T", 1)[0].split("-");
  return `${day}.${month}.${year}`;
};

export const dueLabel = (task: Task) => {
  return task.status === "completed"
    ? "Done"
    : formatTaskDueDate(task.dueDate);
};
