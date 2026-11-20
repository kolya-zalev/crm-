import type { EmployeeSortKey, SortDirection } from "../../EmployeeTable.types";

export type EmployeeSortHeadProps = {
  label: string;
  sortKey: EmployeeSortKey;
  activeKey: EmployeeSortKey;
  direction: SortDirection;
  onSort: (key: EmployeeSortKey) => void;
  align?: "left" | "right";
};
