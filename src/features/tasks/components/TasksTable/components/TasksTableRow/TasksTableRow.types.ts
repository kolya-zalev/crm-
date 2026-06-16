import { Task } from "@/hooks/types";

export interface TasksTableRowProps {
  task: Task;
  leadName: string;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}
