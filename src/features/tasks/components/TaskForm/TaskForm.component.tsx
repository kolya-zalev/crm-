"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaTasksAdd, TaskAddFormValues } from "@/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskFormProps } from "./TaskForm.types";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Controller
          control={form.control}
          name="priority"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="task-priority"
                className="w-full"
                aria-invalid={!!form.formState.errors.priority}
              >
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
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

      <Button type="submit" className="mt-1 w-full">
        {isEditing ? "Save Changes" : "Create Task"}
      </Button>
    </form>
  );
};
