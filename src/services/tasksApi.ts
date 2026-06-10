import {Task} from "@/hooks/types";
import {api} from "@/lib/api";

const tasksApi = {
    getAllTasks: async  () => {
        const response = await api.get<Task[]>("/api/tasks");
        return response.data;
    },
    getByLead: async (leadId: string) => {
        const response = await api.get<Task[]>(`/api/leads/${leadId}/tasks`);
        return response.data;
    },
    createTask: async  (leadId: string, data: {
        title: string;
        description?: string;
        priority: string;
        dueDate: string;
    }) => {
        const response = await api.post<Task>(`/api/leads/${leadId}/tasks`, data);
        return response.data;
    },
    updateTask: async (taskId: string, data: Partial<Task>) => {
        const response = await api.put<Task>(`/api/tasks/${taskId}`, data);
        return response.data;
      },
    deleteTask: async (taskId: string) => {
        await api.delete(`/api/tasks/${taskId}`);
    },
}

export default tasksApi;