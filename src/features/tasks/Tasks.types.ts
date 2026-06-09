import { Task } from "@/hooks/types";

export interface TasksComponentProps {
  filteredTasks: Task[];
  isLoading: boolean;
  statusFilter: string;
  priorityFilter: string;
  getLeadName: (leadId: string) => string;
  onStatusFilterChange: (value: string) => void;
  onPriorityFilterChange: (value: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}
