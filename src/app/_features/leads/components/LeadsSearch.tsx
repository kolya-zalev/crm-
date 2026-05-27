import { Input } from "@/components/ui/input";

interface LeadsSearchProps {
    value:string,
    onChange:(value: string) => void
}

export const LeadsSearch = ({value, onChange}: LeadsSearchProps) => {
    return (
         <Input
          className="rounded-xl w-64 max-w-xs border border-black"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
        />
    )
}