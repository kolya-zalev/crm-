"use client";

import { Button } from "@/components/ui/button";
import { TaskFilters } from "../../utils/tasksColors";
import { TaskFiltersBarProps } from "./TaskFiltersBar.types";

export const TaskFiltersBar = ({
  activeFilter,
  onFilterChange,
}: TaskFiltersBarProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {TaskFilters.map((filter) => {
        const variantFilter = activeFilter === filter ? "default" : "outline";
        return (
          <Button
            key={filter}
            type="button"
            variant={variantFilter}
            size="sm"
            className="cursor-pointer capitalize"
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Button>
        );
      })}
    </div>
  );
};
