import { EmployeeTableRowComponent } from "./EmployeeTableRow.component";
import type { EmployeeTableRowProps } from "./EmployeeTableRow.types";

export const EmployeeTableRowContainer = ({
  row,
  isSummary = false,
  hidePeriodMetrics = false,
}: EmployeeTableRowProps) => {
  return (
    <EmployeeTableRowComponent
      row={row}
      isSummary={isSummary}
      hidePeriodMetrics={hidePeriodMetrics}
    />
  );
};
