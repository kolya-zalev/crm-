import { Task } from "@/hooks/types";
import tasksApi from "@/services/tasksApi";
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

  const invalidateTasks = () => {
    void queryClient.invalidateQueries({ queryKey: ["tasks"] });
    if (leadId) {
      void queryClient.invalidateQueries({
        queryKey: ["leads", leadId, "tasks"],
      });
    }
  };

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskInput) => {
      if (!leadId) throw new Error("leadId is required to create a task");
      return tasksApi.createTask(leadId, data);
    },
    onSuccess: invalidateTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Partial<Task> }) =>
      tasksApi.updateTask(taskId, data),
    onSuccess: invalidateTasks,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => tasksApi.deleteTask(taskId),
    onSuccess: invalidateTasks,
  });

  const createTask = (data: CreateTaskInput) =>
    createTaskMutation.mutateAsync(data);
  const updateTask = (taskId: string, data: Partial<Task>) =>
    updateTaskMutation.mutateAsync({ taskId, data });
  const deleteTask = (taskId: string) => deleteTaskMutation.mutateAsync(taskId);

  return { tasks, isLoading: isPending, createTask, updateTask, deleteTask };
}
