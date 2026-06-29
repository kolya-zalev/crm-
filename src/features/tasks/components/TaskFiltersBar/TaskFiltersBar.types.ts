import { TaskFilterValue } from "../../utils/filterTasks";

export type TaskFiltersBarProps = {
  activeFilter: TaskFilterValue;
  onFilterChange: (filter: TaskFilterValue) => void;
};
