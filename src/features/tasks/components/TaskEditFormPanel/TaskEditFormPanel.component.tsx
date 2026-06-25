"use client";

import { TaskForm } from "../TaskForm";
import { findTask } from "../../utils/findTask";
import { getTaskFormDefaultValues } from "../../utils/getTaskFormDefaultValues";
import { TaskEditFormPanelProps } from "./TaskEditFormPanel.types";

export const TaskEditFormPanel = ({
  showForm,
  editingTaskId,
  allTasks,
  onSubmit,
}: TaskEditFormPanelProps) => {
  if (!showForm) return null;

  const editingTask = findTask(allTasks, editingTaskId ?? "");

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <TaskForm
        key={editingTaskId ?? "new"}
        isEditing={editingTaskId !== null}
        defaultValues={getTaskFormDefaultValues(editingTask)}
        onSubmit={onSubmit}
      />
    </div>
  );
};
