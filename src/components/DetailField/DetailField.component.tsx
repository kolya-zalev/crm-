import { LucideIcon } from "lucide-react";

interface DetailFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  multiline?: boolean;
}

export const DetailField = ({
  icon: Icon,
  label,
  value,
  multiline = false,
}: DetailFieldProps) => {
  return (
    <div>
      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
        <Icon className="size-3.5" />
        <span>{label}</span>
      </div>
      <p
        className={`text-sm font-medium ${multiline ? "whitespace-pre-wrap" : ""}`}
      >
        {value}
      </p>
    </div>
  );
};
