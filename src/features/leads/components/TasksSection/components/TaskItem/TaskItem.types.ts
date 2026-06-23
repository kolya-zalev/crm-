import type { Task } from "@/types";

export interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}
