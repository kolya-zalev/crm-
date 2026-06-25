import { Task } from "@/types";

export type TasksTableRowProps = {
  task: Task;
  leadName: string;
  onToggle: (taskId: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};
