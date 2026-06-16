import { Button } from "@/components/ui/button";
import { TaskFilters } from "../../TasksSection.constants";
import { TaskFilterBarProps } from "./TaskFilterBar.types";

export const TaskFilterBar = ({
  activeFilter,
  onFilterChange,
}: TaskFilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-1.5 border-b pb-3">
      {TaskFilters.map((filter) => {
        const handleFilterClick = () => {
          onFilterChange(filter);
        };

        return (
          <Button
            key={filter}
            size="xs"
            variant={activeFilter === filter ? "default" : "outline"}
            className="capitalize h-7 text-xs px-2.5"
            onClick={handleFilterClick}
          >
            {filter}
          </Button>
        );
      })}
    </div>
  );
};
