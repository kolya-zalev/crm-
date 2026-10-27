import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TeamTableSkeletonComponentProps } from "./TeamTableSkeleton.types";

export const TeamTableSkeletonComponent = ({
  rowItems,
  cellItems,
}: TeamTableSkeletonComponentProps) => (
  <>
    {rowItems.map((_, rowIndex) => (
      <TableRow key={`team-skeleton-${rowIndex}`} className="animate-pulse">
        {cellItems.map((__, cellIndex) => (
          <TableCell key={cellIndex} className="p-3">
            <Skeleton className="mx-auto h-4 w-24 rounded" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
