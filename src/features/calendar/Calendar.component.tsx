"use client";

import { Calendar } from "@/components/ui/calendar";
import { Spinner } from "@/components/ui/spinner";
import { DayTaskList } from "./components/DayTaskList";
import type { CalendarComponentProps } from "./Calendar.types";
import { formatCalendarDay } from "./utils/formatCalendarDay";

export function CalendarComponent({
  selected,
  onSelect,
  tasksByDate,
  dayTasks,
  isLoading,
  getLeadName,
}: CalendarComponentProps) {
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-6 lg:flex-row lg:items-start">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        captionLayout="dropdown"
        className="rounded-lg border shadow-sm"
        modifiers={{
          hasTasks: (date) => Boolean(tasksByDate[formatCalendarDay(date)]),
        }}
        modifiersClassNames={{
          hasTasks:
            "[&_button]:font-semibold [&_button]:relative [&_button]:after:absolute [&_button]:after:bottom-1 [&_button]:after:left-1/2 [&_button]:after:size-1.5 [&_button]:after:-translate-x-1/2 [&_button]:after:rounded-full [&_button]:after:bg-primary [&_button]:after:content-['']",
        }}
      />

      <DayTaskList
        selected={selected}
        tasks={dayTasks}
        getLeadName={getLeadName}
      />
    </div>
  );
}
