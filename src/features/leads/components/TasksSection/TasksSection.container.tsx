import { useTasks } from "@/features/hooks/useTasks";
import { TaskAddFormValues } from "@/validators";
import { TasksSectionProps } from "./TasksSection.types";
import { TasksSectionComponent } from "./TasksSection.component";

export const TasksSectionContainer = ({
  leadId,
  canCreate = true,
  canEdit = true,
  canDelete = true,
}: TasksSectionProps) => {
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

  const handleUpdate = async (
    taskId: string,
    data: Partial<TaskAddFormValues>,
  ) => {
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
      canCreate={canCreate}
      canEdit={canEdit}
      canDelete={canDelete}
    />
  );
};
