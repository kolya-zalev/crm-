"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TaskPriorityColors } from "@/features/tasks/utils/tasksColors";
import type { DayTaskListProps } from "./DayTaskList.types";

export const DayTaskList = ({
  selected,
  tasks,
  getLeadName,
}: DayTaskListProps) => {
  const formattedDate = selected.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="min-w-0 flex-1 rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tasks for this day.
          </p>
        ) : (
          <ul className="divide-y">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0"
              >
                <p className="font-medium">{task.title}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0",
                      TaskPriorityColors[task.priority],
                    )}
                  >
                    {task.priority}
                  </Badge>
                  <Link
                    href={`/lead/${task.leadId}`}
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {getLeadName(task.leadId)}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
