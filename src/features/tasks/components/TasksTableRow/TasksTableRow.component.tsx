"use client";

import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { TaskPriorityColors } from "../../utils/tasksColors";
import { TasksTableRowProps } from "./TasksTableRow.types";
import { TaskTitle } from "../TaskTitle/TaskTitle.component";
import { TaskDueText } from "../TaskDueText/TaskDueText.component";
import { TaskRowActions } from "../TaskRowActions/TaskRowActions.component";

export const TasksTableRow = ({
  task,
  leadName,
  onToggle,
  onEdit,
  onDelete,
}: TasksTableRowProps) => {
  return (
    <TableRow className="transition-colors hover:bg-gray-50/50">
      <TableCell className="text-center">
        <Checkbox
          checked={task.status === "completed"}
          onCheckedChange={(checked) => onToggle(task.id, checked === true)}
        />
      </TableCell>
      <TableCell>
        <TaskTitle task={task} />
      </TableCell>
      <TableCell className="text-center">
        <Link
          href={`/lead/${task.leadId}`}
          className="hover:text-blue-600 hover:underline"
        >
          {leadName}
        </Link>
      </TableCell>
      <TableCell>
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={TaskPriorityColors[task.priority]}
          >
            {task.priority}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <TaskDueText task={task} />
      </TableCell>
      <TableCell className="text-center">
        <TaskRowActions task={task} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};
