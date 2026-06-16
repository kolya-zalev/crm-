import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskFormProps } from "./TaskForm.types";

export const TaskForm = ({ form, editingTaskId, onSubmit }: TaskFormProps) => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-3 border rounded-lg bg-slate-50/50"
    >
      <div className="text-xs font-semibold text-muted-foreground">
        {editingTaskId ? "Edit Task" : "New Task"}
      </div>

      <div>
        <Input {...form.register("title")} placeholder="Task title..." />
        {form.formState.errors.title && (
          <span className="text-red-500 text-xs mt-1 block">
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
          <span className="text-red-500 text-xs mt-1 block">
            {form.formState.errors.dueDate.message}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center">
        <Button
          type="submit"
          className="rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-md cursor-pointer transition-colors w-50"
        >
          {editingTaskId ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};
