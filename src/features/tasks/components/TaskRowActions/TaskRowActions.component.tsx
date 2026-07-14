import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { useState } from "react";
import { toast } from "sonner";

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
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
      toast.success("Task has been deleted successfully");
      setOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button variant="ghost" size="icon-xs" onClick={() => onEdit(task)}>
        <Pencil className="size-4" />
      </Button>
      <Button variant="ghost" size="icon-xs" onClick={() => setOpen(true)}>
        <Trash className="size-4" />
      </Button>
      <ConfirmDeleteDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title={`Delete Task ${task.title}`}
        description={`Are you sure you want to delete the task ${task.title}?`}
      />
    </div>
  );
};
