"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskAddFormValues, schemaTasksAdd } from "@/validators";
import { Task } from "@/hooks/types";
import { formatDateForInput } from "@/utils/formatDate";
import { TaskFormDefaultValues, TaskFilter } from "../TasksSection.constants";
import { filterLeadTasks } from "../utils/TasksSection.utils";

export const useTasksSectionForm = (tasks: Task[]) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");

  const form = useForm<TaskAddFormValues>({
    resolver: zodResolver(schemaTasksAdd),
    defaultValues: TaskFormDefaultValues,
  });

  const filteredTasks = filterLeadTasks(tasks, activeFilter);

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    form.reset({
      title: task.title,
      priority: task.priority,
      dueDate: formatDateForInput(task.dueDate),
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    form.reset(TaskFormDefaultValues);
    setEditingTaskId(null);
    setShowForm(false);
  };

  const handleToggleForm = () => {
    if (showForm) {
      handleCancel();
      return;
    }
    setShowForm(true);
  };

  return {
    form,
    showForm,
    editingTaskId,
    activeFilter,
    filteredTasks,
    setActiveFilter,
    handleEditClick,
    handleCancel,
    handleToggleForm,
  };
};
