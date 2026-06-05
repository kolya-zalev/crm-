import { useState, useEffect } from "react";
import { Task } from "@/hooks/types";

export function useTasks(leadId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/leads/${leadId}/tasks`)
      .then((r) => r.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [leadId]);

  const createTask = async (data: {
    title: string;
    description?: string;
    priority: string;
    dueDate: string;
  }) => {
    const response = await fetch(`/api/leads/${leadId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newTask = await response.json();
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = async (taskId: string, data: Partial<Task>) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await response.json();
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  };

  const deleteTask = async (taskId: string) => {
    await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return { tasks, isLoading, createTask, deleteTask, updateTask };
}
