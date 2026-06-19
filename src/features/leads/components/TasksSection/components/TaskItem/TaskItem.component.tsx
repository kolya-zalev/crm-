import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { priorityColors } from "@/features/tasks/Tasks.styles";
import { isTaskOverdue } from "@/features/tasks/utils/filterTasks";
import { formatDueDate } from "@/utils/formatDate";
import { Pencil, Trash } from "lucide-react";
import { TaskItemProps } from "./TaskItem.types";

export const TaskItem = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: TaskItemProps) => {
  const overdue = isTaskOverdue(task);

  const handleToggle = (checked: boolean | "indeterminate") => {
    onToggle(task.id, checked === true);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const titleClassName =
    task.status === "completed"
      ? "text-muted-foreground line-through"
      : overdue
        ? "font-medium text-red-500"
        : "";

  const dueDateClassName = overdue
    ? "font-bold text-red-500"
    : "text-muted-foreground";

  const dueDateLabel =
    task.status === "completed" ? "Done" : formatDueDate(task.dueDate);

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Checkbox
          className="border border-black"
          id={`task-${task.id}`}
          checked={task.status === "completed"}
          onCheckedChange={handleToggle}
          disabled={!canEdit}
        />
        <span className={`truncate text-sm ${titleClassName}`}>{task.title}</span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        <span className={`w-20 text-right text-xs ${dueDateClassName}`}>
          {dueDateLabel}
        </span>
        {canEdit && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs hover:text-green-500"
            onClick={handleEdit}
          >
            <Pencil />
          </Button>
        )}
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs hover:text-red-600"
            onClick={handleDelete}
          >
            <Trash />
          </Button>
        )}
      </div>
    </div>
  );
};
