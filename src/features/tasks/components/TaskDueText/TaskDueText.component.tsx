import { Task } from "@/types";
import { cn } from "@/lib/utils";
import { isTaskOverdue } from "../../utils/filterTasks";

type TaskDueTextProps = {
  task: Task;
  className?: string;
};

export const TaskDueText = ({ task, className }: TaskDueTextProps) => {
  return (
    <span
      className={cn(
        "text-xs text-muted-foreground",
        task.status === "completed" && "text-green-600",
        task.status !== "completed" && isTaskOverdue(task) && "text-red-500",
        className,
      )}
    >
      {task.status === "completed"
        ? "Done"
        : new Date(task.dueDate).toLocaleDateString()}
    </span>
  );
};
