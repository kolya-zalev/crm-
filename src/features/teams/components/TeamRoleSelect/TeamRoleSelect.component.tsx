import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeamRoleLabels, TeamRoles } from "../../teams.constants";
import type { TeamRoleSelectProps } from "./TeamRoleSelect.types";

export const TeamRoleSelect = ({
  value,
  onValueChange,
  disabled,
  id,
  triggerClassName,
}: TeamRoleSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger id={id} className={triggerClassName}>
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {TeamRoles.map((role) => (
            <SelectItem key={role} value={role}>
              {TeamRoleLabels[role]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
