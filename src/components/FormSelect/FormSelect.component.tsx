import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FormSelectProps } from "./FormSelect.types";

export const FormSelectComponent = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  isInvalid,
}: FormSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        className={cn("w-full", className)}
        aria-invalid={isInvalid}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
