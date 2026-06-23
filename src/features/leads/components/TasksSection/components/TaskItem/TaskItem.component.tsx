"use client";

import { Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskPriorityColors } from "../../TasksSection.constants";
import { isTaskOverdue } from "../../utils/filterSectionTasks";
import { TaskItemProps } from "./TaskItem.types";

export const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const overdue = isTaskOverdue(task);

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Checkbox
          className="border border-black"
          id={`task-${task.id}`}
          checked={task.status === "completed"}
          onCheckedChange={(checked) => onToggle(task.id, !!checked)}
        />

        <span
          className={`truncate text-sm ${
            task.status === "completed"
              ? "text-muted-foreground line-through"
              : overdue
                ? "font-medium text-red-500"
                : ""
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs ${TaskPriorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        <span
          className={`w-20 text-right text-xs ${overdue ? "font-bold text-red-500" : "text-muted-foreground"}`}
        >
          {task.status === "completed"
            ? "Done"
            : new Date(task.dueDate).toLocaleDateString()}
        </span>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs hover:text-green-500"
          onClick={() => onEdit(task)}
        >
          <Pencil />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs hover:text-red-600"
          onClick={() => onDelete(task.id)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};
