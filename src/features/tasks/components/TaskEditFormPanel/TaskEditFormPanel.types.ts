import { Task } from "@/types";
import { TaskAddFormValues } from "@/validators";

export type TaskEditFormPanelProps = {
  showForm: boolean;
  editingTaskId: string | null;
  allTasks: Task[];
  onSubmit: (data: TaskAddFormValues) => void;
};
