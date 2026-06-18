import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const SkeletonRows = 5;

export const LeadsTableSkeleton = ({ columnCount }: { columnCount: number }) => {
  return Array.from({ length: SkeletonRows }).map((_, rowIndex) => (
    <TableRow key={`skeleton-${rowIndex}`} className="animate-pulse">
      {Array.from({ length: columnCount }).map((_, columnIndex) => (
        <TableCell key={`skeleton-${rowIndex}-${columnIndex}`} className="p-3">
          <Skeleton className="mx-auto h-4 w-24 rounded" />
        </TableCell>
      ))}
    </TableRow>
  ));
};
