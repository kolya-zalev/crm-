import type { Task } from "@/types";

export type DayTaskListProps = {
  selected: Date;
  tasks: Task[];
  getLeadName: (leadId: string) => string;
};
