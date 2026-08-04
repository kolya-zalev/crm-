jest.mock("@/features/tasks/api/taskApi");

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import tasksApi from "@/features/tasks/api/taskApi";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "@/types";

const fakeTask: Task = {
  id: "1",
  leadId: "lead-1",
  title: "Call client",
  status: "pending",
  priority: "medium",
  dueDate: "2026-07-26",
  createdAt: "2026-01-01",
};

const createTaskData = {
  title: fakeTask.title,
  priority: fakeTask.priority,
  dueDate: fakeTask.dueDate,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (tasksApi.getAllTasks as jest.Mock).mockResolvedValue([]);
  });

  it("loads tasks from API", async () => {
    (tasksApi.getAllTasks as jest.Mock).mockResolvedValue([fakeTask]);

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.tasks).toEqual([fakeTask]);
    expect(tasksApi.getAllTasks).toHaveBeenCalledTimes(1);
  });

  it("loads tasks by leadId", async () => {
    (tasksApi.getTasksByLead as jest.Mock).mockResolvedValue([fakeTask]);

    const { result } = renderHook(() => useTasks("lead-1"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.tasks).toEqual([fakeTask]);
    expect(tasksApi.getTasksByLead).toHaveBeenCalledWith("lead-1");
  });

  it("createTask calls API and refetches tasks", async () => {
    (tasksApi.getTasksByLead as jest.Mock)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([fakeTask]);
    (tasksApi.createTask as jest.Mock).mockResolvedValue(fakeTask);

    const { result } = renderHook(() => useTasks("lead-1"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.createTask(createTaskData);

    await waitFor(() => expect(result.current.tasks).toEqual([fakeTask]));
    expect(tasksApi.createTask).toHaveBeenCalledWith("lead-1", createTaskData);
    expect(tasksApi.getTasksByLead).toHaveBeenCalledTimes(2);
  });

  it("createTask throws without leadId", async () => {
    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await expect(result.current.createTask(createTaskData)).rejects.toThrow(
      "leadId is required to create a task",
    );
  });

  it("updateTask calls API", async () => {
    (tasksApi.updateTask as jest.Mock).mockResolvedValue(fakeTask);

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.updateTask(fakeTask.id, { title: "Updated title" });

    expect(tasksApi.updateTask).toHaveBeenCalledWith(fakeTask.id, {
      title: "Updated title",
    });
  });

  it("deleteTask calls API and refetches tasks", async () => {
    (tasksApi.getAllTasks as jest.Mock)
      .mockResolvedValueOnce([fakeTask])
      .mockResolvedValueOnce([]);
    (tasksApi.deleteTask as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.deleteTask(fakeTask.id);

    await waitFor(() => expect(result.current.tasks).toEqual([]));
    expect(tasksApi.deleteTask).toHaveBeenCalledWith(fakeTask.id);
    expect(tasksApi.getAllTasks).toHaveBeenCalledTimes(2);
  });
});
