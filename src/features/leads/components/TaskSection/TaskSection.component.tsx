"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskItem } from "@/features/tasks/components/TaskItem";
import { TaskFiltersBar } from "@/features/tasks/components/TaskFiltersBar";
import { TaskEditFormPanel } from "@/features/tasks/components/TaskEditFormPanel";
import { TaskSectionComponentProps } from "./TaskSection.types";

export const TaskSectionComponent = ({
  tasks,
  allTasks,
  activeFilter,
  showForm,
  editingTaskId,
  onFilterChange,
  onOpenCreate,
  onCancelForm,
  onFormSubmit,
  onToggle,
  onDelete,
  onEditClick,
}: TaskSectionComponentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Tasks ({allTasks.length})</CardTitle>
        <Button
          variant={showForm ? "outline" : "default"}
          onClick={showForm ? onCancelForm : onOpenCreate}
        >
          {showForm ? "Cancel" : "Add Task"}
        </Button>
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
          <div className="flex flex-col divide-y">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onEdit={onEditClick}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
