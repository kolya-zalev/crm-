import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { priorityColors } from "../../Tasks.styles";
import { isTaskOverdue } from "../../utils/filterTasks";
import { TasksTableProps } from "./TasksTable.types";

export function TasksTableComponent({
  tasks,
  getLeadName,
  onToggleComplete,
}: TasksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Lead</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-8 text-muted-foreground"
            >
              No tasks found
            </TableCell>
          </TableRow>
        ) : (
          tasks.map((task) => {
            const overdue = isTaskOverdue(task);

            return (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    className="border border-black"
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) =>
                      onToggleComplete(task.id, checked === true)
                    }
                  />
                </TableCell>
                <TableCell>
                  <span
                    className={
                      task.status === "completed"
                        ? "line-through text-muted-foreground"
                        : ""
                    }
                  >
                    {task.title}
                  </span>
                </TableCell>
                <TableCell>
                  <span>{getLeadName(task.leadId)}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      overdue
                        ? "text-red-500 font-bold"
                        : "text-muted-foreground"
                    }
                  >
                    {task.status === "completed"
                      ? "Done"
                      : new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
