"use client";

import type { PeriodFilter } from "@/types/analytics";
import { PeriodSelectComponent } from "./PeriodSelect.component";
import type { PeriodSelectProps } from "./PeriodSelect.types";

export const PeriodSelectContainer = ({
  value,
  onChange,
}: PeriodSelectProps) => {
  const onValueChange = (next: string) => {
    onChange(next as PeriodFilter);
  };

  return <PeriodSelectComponent value={value} onChange={onValueChange} />;
};
