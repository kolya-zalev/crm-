import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

type TaskRowActionsProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export const TaskRowActions = ({
  task,
  onEdit,
  onDelete,
}: TaskRowActionsProps) => {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button variant="ghost" size="icon-xs" onClick={() => onEdit(task)}>
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => onDelete(task.id)}
      >
        <Trash className="size-4" />
      </Button>
    </div>
  );
};
