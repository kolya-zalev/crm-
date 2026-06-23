import { Task } from "@/types";

export interface TasksTableProps {
  tasks: Task[];
  getLeadName: (leadId: string) => string;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}
