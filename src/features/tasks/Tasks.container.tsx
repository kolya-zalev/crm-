"use client";

import { useCallback, useState } from "react";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { useTasks } from "./hooks/useTasks";
import { filterTasks } from "./utils/filterTasks";
import { getLeadName as resolveLeadName } from "./utils/getLeadName";
import { TasksComponent } from "./Tasks.component";

export function TasksContainer() {
  const { tasks, isLoading, updateTask } = useTasks();
  const { leads } = useLeads();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = filterTasks(tasks, statusFilter, priorityFilter);

  const getLeadName = useCallback(
    (leadId: string) => resolveLeadName(leads, leadId),
    [leads],
  );

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    if (completed) {
      updateTask(taskId, {
        status: "completed",
        completedAt: new Date().toISOString(),
      });
    } else {
      updateTask(taskId, {
        status: "pending",
        completedAt: undefined,
      });
    }
  };

  return (
    <TasksComponent
      filteredTasks={filteredTasks}
      isLoading={isLoading}
      statusFilter={statusFilter}
      priorityFilter={priorityFilter}
      getLeadName={getLeadName}
      onStatusFilterChange={setStatusFilter}
      onPriorityFilterChange={setPriorityFilter}
      onToggleComplete={handleToggleComplete}
    />
  );
}
