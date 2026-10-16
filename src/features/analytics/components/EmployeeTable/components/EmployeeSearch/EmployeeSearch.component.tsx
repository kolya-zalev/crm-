"use client";

import { Input } from "@/components/ui/input";
import type { EmployeeSearchProps } from "./EmployeeSearch.types";
export const EmployeeSearchComponent = ({
  value,
  onChange,
}: EmployeeSearchProps) => {
  return (
    <Input
      className="rounded-lg w-64 max-w-xs border "
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search"
    />
  );
};
