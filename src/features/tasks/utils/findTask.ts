import { Task } from "@/types";

export const findTask = (tasks: Task[], taskId: string) => {
  return tasks.find((task) => task.id === taskId);
};
