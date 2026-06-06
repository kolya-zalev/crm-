"use client";

import { useLeads } from "@/features/hooks/UseLeads";
import { useTasks } from "@/features/hooks/useTasks";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
export default function TasksPage() {
  const { tasks, isLoading, updateTask } = useTasks();
  const { leads } = useLeads();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filtered = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "overdue"
          ? task.status === "pending" && new Date(task.dueDate) < new Date()
          : task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" ? true : task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  const getLeadName = (leadId: string) => {
    return leads.find((l) => l.id === leadId)?.name || "No lead";
  };

  const priorityColors: Record<string, string> = {
    high: "text-red-600 bg-red-50",
    medium: "text-yellow-600 bg-yellow-50",
    low: "text-green-600 bg-green-50",
  };

 if (isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">All Tasks</h1>
      <div className="flex gap-4 mb-6">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border rounded p-2 text-sm "
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2 text-sm"
        >
         
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

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
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((task) => {
              const isOverdue =
                task.status === "pending" && new Date(task.dueDate) < new Date();
              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox
                    className="border border-black"
                      checked={task.status === "completed"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateTask(task.id, {
                            status: "completed",
                            completedAt: new Date().toISOString(),
                          });
                        } else {
                          updateTask(task.id, {
                            status: "pending",
                            completedAt: undefined,
                          });
                        }
                      }}
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
                        isOverdue
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
    </div>
  );
}