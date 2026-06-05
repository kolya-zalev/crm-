import { Task } from "@/hooks/types";

export interface TasksSectionProps {
  leadId: string;
}

export interface TasksSectionComponentProps {
  tasks: Task[];
  isLoading: boolean;
  onAdd: (data: {
    title: string;
    description?: string;
    priority: string;
    dueDate: string;
  }) => void;
  onToggle: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
}
