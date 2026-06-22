import { Spinner } from "@/components/ui/spinner";
import { TasksTable } from "./components/TasksTable";
import { TasksComponentProps } from "./Tasks.types";

export function TasksComponent({
  filteredTasks,
  isLoading,
  statusFilter,
  priorityFilter,
  getLeadName,
  onStatusFilterChange,
  onPriorityFilterChange,
  onToggleComplete,
}: TasksComponentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">All Tasks</h1>
      <div className="flex gap-4 mb-6">
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className="border rounded p-2 text-sm "
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <TasksTable
        tasks={filteredTasks}
        getLeadName={getLeadName}
        onToggleComplete={onToggleComplete}
      />
    </div>
  );
}
