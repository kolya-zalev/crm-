import type { TaskSectionFilter } from "../../TasksSection.constants";

export interface TasksSectionFilterProps {
  activeFilter: TaskSectionFilter;
  onFilterChange: (filter: TaskSectionFilter) => void;
}
