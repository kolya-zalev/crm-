"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { priorityColors } from "@/features/tasks/Tasks.styles";
import { isTaskOverdue } from "@/features/tasks/utils/filterTasks";
import { formatDueDate } from "@/utils/formatDate";
import { usePermission } from "@/features/auth/permissions/hooks/usePermission";
import { TasksTableRowProps } from "./TasksTableRow.types";

export const TasksTableRow = ({
  task,
  leadName,
  onToggleComplete,
}: TasksTableRowProps) => {
  const canEdit = usePermission("leads:edit");
  const overdue = isTaskOverdue(task);

  const handleToggle = (checked: boolean | "indeterminate") => {
    onToggleComplete(task.id, checked === true);
  };

  const titleClassName =
    task.status === "completed"
      ? "line-through text-muted-foreground"
      : "";

  const dueDateClassName = overdue
    ? "text-red-500 font-bold"
    : "text-muted-foreground";

  const dueDateLabel =
    task.status === "completed" ? "Done" : formatDueDate(task.dueDate);

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          className="border border-black"
          checked={task.status === "completed"}
          onCheckedChange={handleToggle}
          disabled={!canEdit}
        />
      </TableCell>
      <TableCell>
        <span className={titleClassName}>{task.title}</span>
      </TableCell>
      <TableCell>
        <span>{leadName}</span>
      </TableCell>
      <TableCell>
        <span
          className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </TableCell>
      <TableCell>
        <span className={dueDateClassName}>{dueDateLabel}</span>
      </TableCell>
    </TableRow>
  );
};
