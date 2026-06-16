import { LeadsByStatusBarProps } from "./LeadsByStatusBar.types";

export const LeadsByStatusBar = ({
  label,
  color,
  count,
  percent,
}: LeadsByStatusBarProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`${color} rounded-full h-2`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm font-medium">{count}</span>
    </div>
  );
};
