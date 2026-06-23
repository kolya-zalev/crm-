import { Task } from "@/types";
import { TaskAddFormValues } from "@/validators";

export interface TasksSectionProps {
  leadId: string;
}

export interface TasksSectionComponentProps {
  tasks: Task[];
  isLoading: boolean;
  onAdd: (data: TaskAddFormValues) => void;
  onToggle: (taskId: string, completed: boolean) => void;
  onUpdate: (
    taskId: string,
    data: Partial<TaskAddFormValues>,
  ) => Promise<void> | void;
  onDelete: (taskId: string) => void;
}
