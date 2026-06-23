"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types";
import type { TaskAddFormValues } from "@/validators";
import { TasksSectionComponentProps } from "./TasksSection.types";
import type { TaskSectionFilter } from "./TasksSection.constants";
import { filterSectionTasks } from "./utils/filterSectionTasks";
import { TasksSectionFilter } from "./components/TasksSectionFilter/TasksSectionFilter.component";
import { TaskForm } from "./components/TaskForm/TaskForm.component";
import { TaskItem } from "./components/TaskItem/TaskItem.component";

const emptyFormValues: TaskAddFormValues = {
  title: "",
  priority: "medium",
  dueDate: "",
};

export function TasksSectionComponent({
  tasks,
  isLoading,
  onToggle,
  onAdd,
  onUpdate,
  onDelete,
}: TasksSectionComponentProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [formDefaults, setFormDefaults] =
    useState<TaskAddFormValues>(emptyFormValues);
  const [activeFilter, setActiveFilter] = useState<TaskSectionFilter>("all");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 text-muted-foreground">
        Loading tasks...
      </div>
    );
  }

  const filteredTasks = filterSectionTasks(tasks, activeFilter);

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setFormDefaults({
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setFormDefaults(emptyFormValues);
    setShowForm(false);
  };

  const handleSubmit = (data: TaskAddFormValues) => {
    if (editingTaskId) {
      onUpdate(editingTaskId, data);
    } else {
      onAdd(data);
    }
    handleCancel();
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
          className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Add Task"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <TasksSectionFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {showForm && (
          <TaskForm
            key={editingTaskId ?? "new"}
            isEditing={!!editingTaskId}
            defaultValues={formDefaults}
            onSubmit={handleSubmit}
          />
        )}

        <div className="flex flex-col divide-y">
          {filteredTasks.length === 0 ? (
            <p className="py-3 text-center text-sm text-muted-foreground">
              No tasks found
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onEdit={handleEditClick}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
