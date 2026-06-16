import { Task } from "@/hooks/types";

export const TaskStatusFilter = {
  all: "all",
  overdue: "overdue",
  completed: "completed",
  pending: "pending",
} as const;

export  const matchesStatus = (task: Task, filter: string): boolean => {
  switch (filter) {
    case TaskStatusFilter.all:
      return true;
    case TaskStatusFilter.overdue:
      return task.status === "pending" && new Date(task.dueDate) < new Date();
    default:
      return task.status === filter;
  }
}

export const matchesPriority = (task: Task, filter: string): boolean => {
  return filter === "all" ? true : task.priority === filter;
}

export const filterTasks = (
  tasks: Task[],
  statusFilter: string,
  priorityFilter: string,
): Task[] => {
  return tasks.filter(
    (task) =>
      matchesStatus(task, statusFilter) && matchesPriority(task, priorityFilter),
  );
}

export const isTaskOverdue = (task: Task): boolean => {
  return task.status === "pending" && new Date(task.dueDate) < new Date();
}
