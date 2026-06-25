"use client";

import { useMemo, useState } from "react";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { Task } from "@/types";
import { TaskAddFormValues } from "@/validators";
import { useTasks } from "./hooks/useTasks";
import { TasksComponent } from "./Tasks.component";
import { filterTasks, TaskFilterValue } from "./utils/filterTasks";
import { getToggleTaskUpdate } from "./utils/getToggleTaskUpdate";

export const TasksContainer = () => {
  const { tasks, isLoading: tasksLoading, updateTask, deleteTask } = useTasks();
  const { leads, isLoading: leadsLoading } = useLeads();
  const [activeFilter, setActiveFilter] = useState<TaskFilterValue>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const filteredTasks = filterTasks(tasks, activeFilter);
  
  const leadNameById = useMemo(() => {
    const map = new Map(leads.map(({ id, name }) => [id, name]));
    return (leadId: string) => map.get(leadId) ?? "Lead not found";
  }, [leads]);

  const handleToggle = (taskId: string, completed: boolean) => {
    updateTask(taskId, getToggleTaskUpdate(completed));
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleUpdate = (taskId: string, data: TaskAddFormValues) => {
    updateTask(taskId, data);
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
    }
    handleCancelForm();
  };

  return (
    <TasksComponent
      tasks={filteredTasks}
      isLoading={tasksLoading || leadsLoading}
      getLeadName={leadNameById}
      showForm={showForm}
      editingTaskId={editingTaskId}
      allTasks={tasks}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEditClick={handleEditClick}
      onFormSubmit={handleFormSubmit}
      onCancelForm={handleCancelForm}
    />
  );
};
