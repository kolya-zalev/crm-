import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { periodOptions } from "../../utils/getPeriodRange";
import type { PeriodSelectComponentProps } from "./PeriodSelect.types";

export const PeriodSelectComponent = ({
  value,
  onChange,
}: PeriodSelectComponentProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-44 border ">
        <SelectValue placeholder="Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {periodOptions.map((row) => (
            <SelectItem key={row.value} value={row.value}>
              {row.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
