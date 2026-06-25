"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TasksTableComponentProps } from "./TasksTable.types";
import { TasksTableRow } from "../TasksTableRow";
export const TasksTableComponent = ({
  tasks,
  getLeadName,
  onToggle,
  onEditClick,
  onDelete,
}: TasksTableComponentProps) => {
  return (
    <div>
      <p className="mb-2 text-center text-sm font-medium text-gray-600">
        Total tasks: {tasks.length}
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
        <Table className="border-collapse text-base">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-center">Lead</TableHead>
              <TableHead className="text-center">Priority</TableHead>
              <TableHead className="text-center">Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TasksTableRow
                key={task.id}
                task={task}
                leadName={getLeadName(task.leadId)}
                onToggle={onToggle}
                onEdit={onEditClick}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
