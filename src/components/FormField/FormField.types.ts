import { FieldError, Path, UseFormReturn } from "react-hook-form";

export interface FormFieldProps<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  id?: string;
  type?: string;
}

export const getFieldErrorMessage = (error: FieldError | undefined) =>
  error?.message;
