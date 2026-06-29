import { Task } from "@/types";

export const getToggleTaskUpdate = (completed: boolean): Partial<Task> => {
  if (completed) {
    return {
      status: "completed",
      completedAt: new Date().toISOString(),
    };
  }

  return { status: "pending" };
};
