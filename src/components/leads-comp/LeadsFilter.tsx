import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeadsFilterProps{
    value:string,
    onChange: (value:string) => void
}


export const LeadsFilter = ({value, onChange}: LeadsFilterProps) => {
    return(
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full max-w-48 rounded-xl border border-black">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
    )
}