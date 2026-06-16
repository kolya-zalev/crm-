import { Task } from "@/hooks/types";

export interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}
