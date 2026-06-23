"use client";

import { Button } from "@/components/ui/button";
import { TaskSectionFilters } from "../../TasksSection.constants";
import { TasksSectionFilterProps } from "./TasksSectionFilter.types";

export const TasksSectionFilter = ({
  activeFilter,
  onFilterChange,
}: TasksSectionFilterProps) => {
  return (
    <div className="flex flex-wrap gap-1.5 border-b pb-3">
      {TaskSectionFilters.map((filter) => (
        <Button
          key={filter}
          size="xs"
          variant={activeFilter === filter ? "default" : "outline"}
          className="h-7 px-2.5 text-xs capitalize"
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};
