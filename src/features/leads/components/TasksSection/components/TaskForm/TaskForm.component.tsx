"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskAddFormValues, schemaTasksAdd } from "@/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskFormProps } from "./TaskForm.types";

export const TaskForm = ({
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
      className="flex flex-col gap-3 rounded-lg border bg-slate-50/50 p-3"
    >
      <div className="text-xs font-semibold text-muted-foreground">
        {isEditing ? "Edit Task" : "New Task"}
      </div>

      <div>
        <Input {...form.register("title")} placeholder="Task title..." />
        {form.formState.errors.title && (
          <span className="mt-1 block text-xs text-red-500">
            {form.formState.errors.title.message}
          </span>
        )}
      </div>

      <div>
        <select
          {...form.register("priority")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <Input type="date" {...form.register("dueDate")} />
        {form.formState.errors.dueDate && (
          <span className="mt-1 block text-xs text-red-500">
            {form.formState.errors.dueDate.message}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center">
        <Button
          type="submit"
          className="w-50 cursor-pointer rounded-xl bg-green-500 text-white shadow-md transition-colors hover:bg-green-600"
        >
          {isEditing ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};
