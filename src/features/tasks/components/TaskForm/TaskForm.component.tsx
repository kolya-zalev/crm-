"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaTasksAdd, TaskAddFormValues } from "@/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskFormProps } from "./TaskForm.types";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

export const TaskFormComponent = ({
  isEditing,
  defaultValues,
  onSubmit,
}: TaskFormProps) => {
  const form = useForm<TaskAddFormValues>({
    resolver: zodResolver(schemaTasksAdd),
    defaultValues,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      <Field data-invalid={!!form.formState.errors.title}>
        <FieldLabel htmlFor="task-title" className="text-sm font-medium">
          Title
        </FieldLabel>
        <Input
          id="task-title"
          {...form.register("title")}
          placeholder="Task title"
          aria-invalid={!!form.formState.errors.title}
        />
        {form.formState.errors.title?.message && (
          <FieldDescription className="text-sm text-red-500">
            {form.formState.errors.title.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!form.formState.errors.priority}>
        <FieldLabel htmlFor="task-priority" className="text-sm font-medium">
          Priority
        </FieldLabel>
        <select
          id="task-priority"
          {...form.register("priority")}
          className="w-full rounded-none border border-input bg-transparent p-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 dark:bg-zinc-900"
          aria-invalid={!!form.formState.errors.priority}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {form.formState.errors.priority?.message && (
          <FieldDescription className="text-sm text-red-500">
            {form.formState.errors.priority.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!form.formState.errors.dueDate}>
        <FieldLabel htmlFor="task-dueDate" className="text-sm font-medium">
          Due Date
        </FieldLabel>
        <Input
          id="task-dueDate"
          type="date"
          {...form.register("dueDate")}
          aria-invalid={!!form.formState.errors.dueDate}
        />
        {form.formState.errors.dueDate?.message && (
          <FieldDescription className="text-sm text-red-500">
            {form.formState.errors.dueDate.message}
          </FieldDescription>
        )}
      </Field>

      <Button
        type="submit"
        className="mt-1 w-full cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
      >
        {isEditing ? "Save Changes" : "Create Task"}
      </Button>
    </form>
  );
};
