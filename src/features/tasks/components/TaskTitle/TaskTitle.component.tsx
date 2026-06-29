import { cn } from "@/lib/utils";
import { isTaskOverdue } from "../../utils/filterTasks";
import { TaskTitleProps } from "./TaskTitile.types";

export const TaskTitle = ({ task, className }: TaskTitleProps) => {
  return (
    <p
      className={cn(
        "truncate text-sm font-medium",
        task.status === "completed" && "text-muted-foreground line-through",
        task.status !== "completed" && isTaskOverdue(task) && "text-red-600",
        className,
      )}
    >
      {task.title}
    </p>
  );
};
