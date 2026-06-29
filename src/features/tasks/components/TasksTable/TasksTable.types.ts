import { Task } from "@/types";

export type TasksTableComponentProps = {
  tasks: Task[];
  getLeadName: (leadId: string) => string;
  onToggle: (taskId: string, completed: boolean) => void;
  onEditClick: (task: Task) => void;
  onDelete: (taskId: string) => void;
};
