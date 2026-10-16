"use client";
import { EmployeeSortHeadComponent } from "./EmployeeSortHead.component";
import type { EmployeeSortHeadProps } from "./EmployeeSortHead.types";

export const EmployeeSortHeadContainer = ({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  align = "right",
}: EmployeeSortHeadProps) => {
  return (
    <EmployeeSortHeadComponent
      label={label}
      sortKey={sortKey}
      activeKey={activeKey}
      direction={direction}
      onSort={onSort}
      align={align}
    />
  );
};
