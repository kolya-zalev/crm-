import type { Task } from "@/types";

export type CalendarComponentProps = {
  selected: Date;
  onSelect: (date: Date | undefined) => void;
  tasksByDate: Record<string, Task[]>;
  dayTasks: Task[];
  isLoading: boolean;
  getLeadName: (leadId: string) => string;
};