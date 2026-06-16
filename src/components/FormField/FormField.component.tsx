import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormFieldProps, getFieldErrorMessage } from "./FormField.types";
import { FieldError } from "react-hook-form";

export const FormField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder,
  id,
  type = "text",
}: FormFieldProps<T>) => {
  const fieldId = id ?? String(name);
  const error = form.formState.errors[name];
  const errorMessage = getFieldErrorMessage(error as FieldError);

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={fieldId} className="text-sm font-medium">
        {label}
      </FieldLabel>
      <Input
        id={fieldId}
        type={type}
        {...form.register(name)}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {errorMessage && (
        <FieldDescription className="text-red-500 text-sm">
          {errorMessage}
        </FieldDescription>
      )}
    </Field>
  );
};
