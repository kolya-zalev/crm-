import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { EmployeeSortHeadProps } from "./EmployeeSortHead.types";

export const EmployeeSortHeadComponent = ({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  align = "right",
}: EmployeeSortHeadProps) => {
  const isActive = activeKey === sortKey;
  const Icon = direction === "asc" ? ArrowUp : ArrowDown;
  const isRight = align === "right";

  return (
    <TableHead className={cn(isRight && "text-right")}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-7 w-full gap-1 px-0 font-medium",
          isRight ? "justify-end" : "justify-start",
        )}
        onClick={() => onSort(sortKey)}
      >
        {isRight && isActive ? <Icon className="size-3.5" /> : null}
        {label}
        {!isRight && isActive ? <Icon className="size-3.5" /> : null}
      </Button>
    </TableHead>
  );
};
