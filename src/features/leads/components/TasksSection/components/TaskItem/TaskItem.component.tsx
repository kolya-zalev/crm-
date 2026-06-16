import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { priorityColors } from "@/features/tasks/Tasks.styles";
import { isTaskOverdue } from "@/features/tasks/utils/filterTasks";
import { formatDueDate } from "@/utils/formatDate";
import { Pencil, Trash } from "lucide-react";
import { TaskItemProps } from "./TaskItem.types";

export const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
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
      ? "line-through text-muted-foreground"
      : overdue
        ? "text-red-500 font-medium"
        : "";

  const dueDateClassName = overdue
    ? "text-red-500 font-bold"
    : "text-muted-foreground";

  const dueDateLabel =
    task.status === "completed" ? "Done" : formatDueDate(task.dueDate);

  return (
    <div className="flex items-center justify-between py-3 gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          className="border border-black"
          id={`task-${task.id}`}
          checked={task.status === "completed"}
          onCheckedChange={handleToggle}
        />
        <span className={`truncate text-sm ${titleClassName}`}>{task.title}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        <span className={`text-xs w-20 text-right ${dueDateClassName}`}>
          {dueDateLabel}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs hover:text-green-500"
          onClick={handleEdit}
        >
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs hover:text-red-600"
          onClick={handleDelete}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};
