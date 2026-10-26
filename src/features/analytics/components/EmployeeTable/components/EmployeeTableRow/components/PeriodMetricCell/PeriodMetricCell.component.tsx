import { emptyValue } from "@/config/constants";
import { NumericCell } from "../NumericCell";
import type { PeriodMetricCellProps } from "./PeriodMetricCell.types";

export const PeriodMetricCellComponent = ({
  isHidden,
  children,
}: PeriodMetricCellProps) => (
  <NumericCell>{isHidden ? emptyValue : children}</NumericCell>
);
