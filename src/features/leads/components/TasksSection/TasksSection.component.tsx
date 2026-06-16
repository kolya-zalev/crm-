"use client";

import { TasksSectionComponentProps } from "./TasksSection.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskAddFormValues } from "@/validators";
import { TaskFilterBar } from "./components/TaskFilterBar/TaskFilterBar.component";
import { TaskForm } from "./components/TaskForm/TaskForm.component";
import { TasksList } from "./components/TasksList/TasksList.component";
import { useTasksSectionForm } from "./hooks/useTasksSectionForm";

interface ExtendedProps extends TasksSectionComponentProps {
  onUpdate: (
    taskId: string,
    data: Partial<TaskAddFormValues>,
  ) => Promise<void> | void;
}

export const TasksSectionComponent = ({
  tasks,
  isLoading,
  onToggle,
  onAdd,
  onUpdate,
  onDelete,
}: ExtendedProps) => {
  const {
    form,
    showForm,
    editingTaskId,
    activeFilter,
    filteredTasks,
    setActiveFilter,
    handleEditClick,
    handleCancel,
    handleToggleForm,
  } = useTasksSectionForm(tasks);

  const onSubmit = (data: TaskAddFormValues) => {
    if (editingTaskId) {
      onUpdate(editingTaskId, data);
    } else {
      onAdd(data);
    }
    handleCancel();
  };

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex items-center justify-center p-6">
        Loading tasks...
      </div>
    );
  }

  return (
    <Card className="border border-gray-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          Tasks ({tasks.length})
        </CardTitle>
        <Button
          size="sm"
          onClick={handleToggleForm}
          className="cursor-pointer rounded-xl bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Add Task"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <TaskFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {showForm && (
          <TaskForm
            form={form}
            editingTaskId={editingTaskId}
            onSubmit={onSubmit}
          />
        )}

        <div className="flex flex-col divide-y">
          <TasksList
            tasks={filteredTasks}
            onToggle={onToggle}
            onEdit={handleEditClick}
            onDelete={onDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
};
