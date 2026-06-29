"use client";

import { useState } from "react";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/types";
import { TaskAddFormValues } from "@/validators";
import { filterTasks, TaskFilterValue } from "@/features/tasks/utils/filterTasks";
import { getToggleTaskUpdate } from "@/features/tasks/utils/getToggleTaskUpdate";
import { TaskSectionComponent } from "./TaskSection.component";
import { TaskSectionProps } from "./TaskSection.types";

export const TaskSectionContainer = ({ leadId }: TaskSectionProps) => {
  const { tasks, isLoading, createTask, updateTask, deleteTask } =
    useTasks(leadId);

  const [activeFilter, setActiveFilter] = useState<TaskFilterValue>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const filteredTasks = filterTasks(tasks, activeFilter);

  const handleToggle = (taskId: string, completed: boolean) => {
    updateTask(taskId, getToggleTaskUpdate(completed));
  };

  const handleCreate = (data: TaskAddFormValues) => {
    createTask(data);
  };

  const handleUpdate = (taskId: string, data: TaskAddFormValues) => {
    updateTask(taskId, data);
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleOpenCreate = () => {
    setEditingTaskId(null);
    setShowForm(true);
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTaskId(null);
  };

  const handleFormSubmit = (data: TaskAddFormValues) => {
    if (editingTaskId !== null) {
      handleUpdate(editingTaskId, data);
    } else {
      handleCreate(data);
    }
    handleCancelForm();
  };

  return (
    <TaskSectionComponent
      tasks={filteredTasks}
      allTasks={tasks}
      isLoading={isLoading}
      activeFilter={activeFilter}
      showForm={showForm}
      editingTaskId={editingTaskId}
      onFilterChange={setActiveFilter}
      onOpenCreate={handleOpenCreate}
      onCancelForm={handleCancelForm}
      onFormSubmit={handleFormSubmit}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEditClick={handleEditClick}
    />
  );
};
