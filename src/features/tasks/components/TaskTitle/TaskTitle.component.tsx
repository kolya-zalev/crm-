import { Task } from "@/types";
import { cn } from "@/lib/utils";
import { isTaskOverdue } from "../../utils/filterTasks";

type TaskTitleProps = {
  task: Task;
  className?: string;
};

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
