import { Task } from "@/hooks/types";

export interface TasksListProps {
  tasks: Task[];
  onToggle: (taskId: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}
