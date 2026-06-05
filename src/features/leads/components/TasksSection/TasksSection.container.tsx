import { useTasks } from "@/features/hooks/useTasks";
import { TasksSectionProps } from "./TasksSection.types";
import { TasksSectionComponent } from "./TasksSection.component";

export function TasksSectionContainer({ leadId }: TasksSectionProps) {
  const { tasks, isLoading, createTask, deleteTask, updateTask } =
    useTasks(leadId);

  const handleToggle = async (taskId: string, completed: boolean) => {
    if (completed) {
      await updateTask(taskId, {
        status: "completed",
        completedAt: new Date().toISOString(),
      });
    } else {
      await updateTask(taskId, { status: "pending", completedAt: undefined });
    }
  };

  const handleUpdate = async (taskId: string, data: any) => {
    await updateTask(taskId, data);
  };

  return (
    <TasksSectionComponent
      tasks={tasks}
      isLoading={isLoading}
      onAdd={createTask}
      onToggle={handleToggle}
      onUpdate={handleUpdate}
      onDelete={deleteTask}
    />
  );
}
