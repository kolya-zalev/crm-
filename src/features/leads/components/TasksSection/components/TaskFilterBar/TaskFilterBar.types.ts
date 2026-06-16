import { TaskFilter } from "../../TasksSection.constants";

export interface TaskFilterBarProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}
