"use client";

import { Input } from "@/components/ui/input";
import { LeadsSearchProps } from "./LeadsSearch.types";

export const LeadsSearch = ({ value, onChange }: LeadsSearchProps) => {
  return (
    <Input
      className="rounded-xl w-64 max-w-xs border border-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search"
    />
  );
};
