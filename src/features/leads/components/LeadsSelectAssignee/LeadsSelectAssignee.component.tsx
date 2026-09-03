import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadsSelectAssigneeComponentProps } from "./LeadsSelectAssignee.types";

export const LeadsSelectAssigneeComponent = ({
  assigneeToId,
  users,
  canUnassign,
  onChange,
}: LeadsSelectAssigneeComponentProps) => {
  return (
    <Select value={assigneeToId ?? "unassigned"} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48 rounded-xl border border-black">
        <SelectValue placeholder="Assignee" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {canUnassign ? (
            <SelectItem value="unassigned">Unassigned</SelectItem>
          ) : null}
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
