import { Task } from "@/types";
import { TaskAddFormValues } from "@/validators";
import { TaskFilterValue } from "./utils/filterTasks";

export type TasksComponentProps = {
  tasks: Task[];
  isLoading: boolean;
  activeFilter: TaskFilterValue;
  onFilterChange: (filter: TaskFilterValue) => void;
  showForm: boolean;
  editingTaskId: string | null;
  allTasks: Task[];
  getLeadName: (leadId: string) => string;
  onToggle: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onEditClick: (task: Task) => void;
  onFormSubmit: (data: TaskAddFormValues) => void;
  onCancelForm: () => void;
};
