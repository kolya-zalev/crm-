import tasksApi from "@/features/tasks/api/taskApi";
import type { Task } from "@/types";
import type { TaskAddFormValues } from "@/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasks = (leadId?: string) => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isPending } = useQuery({
    queryKey: leadId ? ["leads", leadId, "tasks"] : ["tasks"],
    queryFn: () =>
      leadId ? tasksApi.getTasksByLead(leadId) : tasksApi.getAllTasks(),
  });

  const invalidateTasks = () => {
    if (leadId) {
      queryClient.invalidateQueries({ queryKey: ["leads", leadId, "tasks"] });
    }
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const createTaskMutation = useMutation({
    mutationFn: (data: TaskAddFormValues) => {
      if (!leadId) {
        throw new Error("leadId is required to create a task");
      }
      return tasksApi.createTask(leadId, data);
    },
    onSuccess: invalidateTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: Partial<Task>;
    }) => tasksApi.updateTask(taskId, data),
    onSuccess: invalidateTasks,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => tasksApi.deleteTask(taskId),
    onSuccess: invalidateTasks,
  });

  const createTask = (data: TaskAddFormValues) =>
    createTaskMutation.mutateAsync(data);

  const updateTask = (taskId: string, data: Partial<Task>) =>
    updateTaskMutation.mutateAsync({ taskId, data });

  const deleteTask = (taskId: string) =>
    deleteTaskMutation.mutateAsync(taskId);

  return {
    tasks,
    isLoading: isPending,
    createTask,
    updateTask,
    deleteTask,
  };
}
