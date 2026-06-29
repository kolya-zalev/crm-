import { TaskAddFormValues } from "@/validators";

export type TaskFormProps = {
  isEditing: boolean;
  defaultValues: TaskAddFormValues;
  onSubmit: (data: TaskAddFormValues) => void;
};
