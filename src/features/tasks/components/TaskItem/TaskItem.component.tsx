"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TaskPriorityColors } from "../../utils/tasksColors";
import { TaskItemProps } from "./TaskItem.types";
import { TaskTitle } from "../TaskTitle/TaskTitle.component";
import { TaskDueText } from "../TaskDueText/TaskDueText.component";
import { TaskRowActions } from "../TaskRowActions/TaskRowActions.component";

export const TaskItemComponent = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) => {
  return (
    <div className="flex items-start justify-between gap-3 py-3">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <Checkbox
          checked={task.status === "completed"}
          onCheckedChange={(checked) => onToggle(task.id, checked === true)}
          className="mt-0.5 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <TaskTitle task={task} />
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn("shrink-0", TaskPriorityColors[task.priority])}
            >
              {task.priority}
            </Badge>
            <TaskDueText task={task} />
          </div>
        </div>
      </div>
      <TaskRowActions task={task} onEdit={onEdit} onDelete={onDelete} onDeleteConfirm={() => {}} />
    </div>
  );
};
