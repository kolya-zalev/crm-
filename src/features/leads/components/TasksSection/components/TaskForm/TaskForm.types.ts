import type { TaskAddFormValues } from "@/validators";

export interface TaskFormProps {
  isEditing: boolean;
  defaultValues: TaskAddFormValues;
  onSubmit: (data: TaskAddFormValues) => void;
}
