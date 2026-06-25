import { Task } from "@/types";

export type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};
