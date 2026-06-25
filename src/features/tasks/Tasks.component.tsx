"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TasksComponentProps } from "./Tasks.types";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { TaskFiltersBar } from "./components/TaskFiltersBar";
import { TaskEditFormPanel } from "./components/TaskEditFormPanel";
import { TasksTable } from "./components/TasksTable";

export const TasksComponent = ({
  tasks,
  isLoading,
  getLeadName,
  showForm,
  editingTaskId,
  allTasks,
  activeFilter,
  onFilterChange,
  onToggle,
  onDelete,
  onEditClick,
  onFormSubmit,
  onCancelForm,
}: TasksComponentProps) => {
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        {showForm && (
          <Button
            onClick={onCancelForm}
            className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
          >
            Cancel
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TaskFiltersBar
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />

        <TaskEditFormPanel
          showForm={showForm}
          editingTaskId={editingTaskId}
          allTasks={allTasks}
          onSubmit={onFormSubmit}
        />

        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks found</p>
        ) : (
          <TasksTable
            tasks={tasks}
            getLeadName={getLeadName}
            onToggle={onToggle}
            onEditClick={onEditClick}
            onDelete={onDelete}
          />
        )}
      </CardContent>
    </Card>
  );
};
