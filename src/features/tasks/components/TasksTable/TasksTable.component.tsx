import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TasksTableProps } from "./TasksTable.types";
import { TasksTableRow } from "./components/TasksTableRow/TasksTableRow.component";

export const TasksTableComponent = ({
  tasks,
  getLeadName,
  onToggleComplete,
}: TasksTableProps) => {
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
          tasks.map((task) => (
            <TasksTableRow
              key={task.id}
              task={task}
              leadName={getLeadName(task.leadId)}
              onToggleComplete={onToggleComplete}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};
