import { UseFormReturn } from "react-hook-form";
import { TaskAddFormValues } from "@/validators";

export interface TaskFormProps {
  form: UseFormReturn<TaskAddFormValues>;
  editingTaskId: string | null;
  onSubmit: (data: TaskAddFormValues) => void;
}
