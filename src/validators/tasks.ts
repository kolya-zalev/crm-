import * as z from "zod";

export const schemaTasksAdd = z.object({
  title: z.string().min(3, { message: "Invalid title" }),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(1, { message: "Due date is required" }),
});

export type TaskAddFormValues = z.infer<typeof schemaTasksAdd>;
