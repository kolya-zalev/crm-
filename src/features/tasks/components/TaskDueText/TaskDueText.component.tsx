import {TaskDueTextProps} from './TaskDue.types'
import { cn } from "@/lib/utils";
import { isTaskOverdue } from "../../utils/filterTasks";
import { dueLabel } from "./utils/formatTaskDueDate";

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
      {dueLabel(task)}
    </span>
  );
};
