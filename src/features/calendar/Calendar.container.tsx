"use client";

import { useMemo, useState } from "react";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { CalendarComponent } from "./Calendar.component";
import { formatCalendarDay } from "./utils/formatCalendarDay";
import { groupTasksByDate } from "./utils/groupTasksByDate";

export function CalendarContainer() {
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { leads, isLoading: leadsLoading } = useLeads();
  const [selected, setSelected] = useState(new Date());

  const tasksByDate = useMemo(() => groupTasksByDate(tasks), [tasks]);
  const dayTasks = tasksByDate[formatCalendarDay(selected)] ?? [];

  const leadNameById = useMemo(() => {
    const map = new Map(leads.map(({ id, name }) => [id, name]));
    return (leadId: string) => map.get(leadId) ?? "Lead not found";
  }, [leads]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelected(date);
  };

  return (
    <CalendarComponent
      selected={selected}
      onSelect={handleSelect}
      tasksByDate={tasksByDate}
      dayTasks={dayTasks}
      isLoading={tasksLoading || leadsLoading}
      getLeadName={leadNameById}
    />
  );
}
