import { Task } from "@/types";
import { TaskAddFormValues } from "@/validators";
import { TaskFilterValue } from "@/features/tasks/utils/filterTasks";

export type TaskSectionProps = {
  leadId: string;
};

export interface TaskSectionComponentProps {
  tasks: Task[];
  allTasks: Task[];
  isLoading: boolean;
  activeFilter: TaskFilterValue;
  showForm: boolean;
  editingTaskId: string | null;
  onFilterChange: (filter: TaskFilterValue) => void;
  onOpenCreate: () => void;
  onCancelForm: () => void;
  onFormSubmit: (data: TaskAddFormValues) => void;
  onToggle: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onEditClick: (task: Task) => void;
}
