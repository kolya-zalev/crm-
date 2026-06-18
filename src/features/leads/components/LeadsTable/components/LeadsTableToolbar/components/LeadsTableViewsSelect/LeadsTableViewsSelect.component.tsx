import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadsTableViewsSelectProps } from "./LeadsTableViewsSelect.types";

export const LeadsTableViewsSelect = ({
  allViews,
  activeViewId,
  onApplyView,
}: LeadsTableViewsSelectProps) => {
  const handleValueChange = (value: string) => {
    onApplyView(value);
  };

  return (
    <Select value={activeViewId ?? ""} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full max-w-48 rounded-xl border border-black">
        <SelectValue placeholder="Custom view" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {allViews.map((view) => (
            <SelectItem key={view.id} value={view.id}>
              {view.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
