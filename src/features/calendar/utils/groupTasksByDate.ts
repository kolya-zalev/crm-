import type { Task } from "@/types";

export const groupTasksByDate = (tasks: Task[]) => {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (task.status !== "pending") return acc;

    const day = task.dueDate.split("T")[0]; //
    acc[day] = [...(acc[day] ?? []), task];
    return acc;
  }, {});
};
