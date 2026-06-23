import type { Task } from "@/types";
import tasksApi from "@/features/tasks/api/tasksApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CreateTaskInput = {
  title: string;
  description?: string;
  priority: string;
  dueDate: string;
};

export function useTasks(leadId?: string) {
  const queryClient = useQueryClient();

  const { data: tasks = [], isPending } = useQuery({
    queryKey: leadId ? ["leads", leadId, "tasks"] : ["tasks"],
    queryFn: () =>
      leadId ? tasksApi.getByLead(leadId) : tasksApi.getAllTasks(),
  });

  const invalidate = () => {
    if (leadId) {
      queryClient.invalidateQueries({ queryKey: ["leads", leadId, "tasks"] });
    }
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskInput) => {
      if (!leadId) throw new Error("leadId is required to create a task");
      return tasksApi.createTask(leadId, data);
    },
    onSuccess: invalidate,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: Partial<Task>;
    }) => tasksApi.updateTask(taskId, data),
    onSuccess: invalidate,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => tasksApi.deleteTask(taskId),
    onSuccess: invalidate,
  });

  const createTask = (data: CreateTaskInput) =>
    createTaskMutation.mutateAsync(data);
  const updateTask = (taskId: string, data: Partial<Task>) =>
    updateTaskMutation.mutateAsync({ taskId, data });
  const deleteTask = (taskId: string) => deleteTaskMutation.mutateAsync(taskId);

  return {
    tasks,
    isLoading: isPending,
    createTask,
    updateTask,
    deleteTask,
  };
}
