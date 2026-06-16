import { TaskItem } from "../TaskItem/TaskItem.component";
import { TasksListProps } from "./TasksList.types";

export const TasksList = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TasksListProps) => {
  if (tasks.length === 0) {
    return (
      <p className="text-muted-foreground py-3 text-center text-sm">
        No tasks found
      </p>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
