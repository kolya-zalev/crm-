import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const TeamTableSkeleton = ({ rowCount = 4, columnsCount = 5 }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={`team-skeleton-${rowIndex}`} className="animate-pulse">
          {Array.from({ length: columnsCount }).map((__, cellIndex) => (
            <TableCell key={cellIndex} className="p-3">
              <Skeleton className="mx-auto h-4 w-24 rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
