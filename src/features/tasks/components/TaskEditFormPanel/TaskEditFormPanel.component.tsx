"use client";

import { TaskForm } from "../TaskForm";
import { getTaskFormDefaultValues } from "../../utils/getTaskFormDefaultValues";
import { TaskEditFormPanelProps } from "./TaskEditFormPanel.types";
import { editingTask } from "./utils/editingTask";

export const TaskEditFormPanel = ({
  showForm,
  editingTaskId,
  allTasks,
  onSubmit,
}: TaskEditFormPanelProps) => {
  if (!showForm) return null;

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <TaskForm
        key={editingTaskId ?? "new"}
        isEditing={editingTaskId !== null}
        defaultValues={getTaskFormDefaultValues(
          editingTask(allTasks, editingTaskId),
        )}
        onSubmit={onSubmit}
      />
    </div>
  );
};
