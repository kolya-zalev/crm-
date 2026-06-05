"use client";

import { useState } from "react";
import { TasksSectionComponentProps } from "./TasksSection.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TaskAddFormValues, schemaTasksAdd } from "@/hooks/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash, Pencil } from "lucide-react";

interface ExtendedProps extends TasksSectionComponentProps {
  onUpdate: (
    taskId: string,
    data: Partial<TaskAddFormValues>,
  ) => Promise<void> | void;
}

export function TasksSectionComponent({
  tasks,
  isLoading,
  onToggle,
  onAdd,
  onUpdate,
  onDelete,
}: ExtendedProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "overdue" | "completed" | "high"
  >("all");

  const form = useForm<TaskAddFormValues>({
    resolver: zodResolver(schemaTasksAdd),
    defaultValues: {
      title: "",
      priority: "medium",
      dueDate: "",
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-6 text-muted-foreground">
        Loading tasks...
      </div>
    );

  const priorityColors: Record<string, string> = {
    high: "text-red-600 bg-red-50",
    medium: "text-yellow-600 bg-yellow-50",
    low: "text-green-600 bg-green-50",
  };

  const filteredTasks = tasks.filter((task) => {
    const isTaskOverdue =
      task.status === "pending" && new Date(task.dueDate) < new Date();

    if (activeFilter === "completed") return task.status === "completed";
    if (activeFilter === "high") return task.priority === "high";
    if (activeFilter === "overdue") return isTaskOverdue;
    return true;
  });

  const handleEditClick = (task: any) => {
    setEditingTaskId(task.id);
    const formattedDate = task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "";

    form.reset({
      title: task.title,
      priority: task.priority,
      dueDate: formattedDate,
    });
    setShowForm(true);
  };

  const onSubmit = (data: TaskAddFormValues) => {
    if (editingTaskId) {
      onUpdate(editingTaskId, data);
    } else {
      onAdd(data);
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.reset({ title: "", priority: "medium", dueDate: "" });
    setEditingTaskId(null);
    setShowForm(false);
  };

  return (
    <Card className="border border-gray-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          Tasks ({tasks.length})
        </CardTitle>
        <Button
          size="sm"
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
          className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md cursor-pointer transition-colors"
        >
          {showForm ? "Cancel" : "Add Task"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5 border-b pb-3">
          {(["all", "overdue", "completed", "high"] as const).map((filter) => (
            <Button
              key={filter}
              size="xs"
              variant={activeFilter === filter ? "default" : "outline"}
              className="capitalize h-7 text-xs px-2.5"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {showForm && (
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
        )}

        <div className="flex flex-col divide-y">
          {filteredTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground py-3 text-center">
              No tasks found
            </p>
          ) : (
            filteredTasks.map((task) => {
              const isOverdue =
                task.status === "pending" &&
                new Date(task.dueDate) < new Date();

              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between py-3 gap-4"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Checkbox
                      className="border border-black"
                      id={`task-${task.id}`}
                      checked={task.status === "completed"}
                      onCheckedChange={(checked) =>
                        onToggle(task.id, !!checked)
                      }
                    />

                    <span
                      className={`truncate text-sm ${
                        task.status === "completed"
                          ? "line-through text-muted-foreground"
                          : isOverdue
                            ? "text-red-500 font-medium"
                            : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`text-xs w-20 text-right ${isOverdue ? "text-red-500 font-bold" : "text-muted-foreground"}`}
                    >
                      {task.status === "completed"
                        ? "Done"
                        : new Date(task.dueDate).toLocaleDateString()}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs hover:text-green-500"
                      onClick={() => handleEditClick(task)}
                    >
                      <Pencil />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs hover:text-red-600"
                      onClick={() => onDelete(task.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
