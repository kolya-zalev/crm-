import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const columnsCount = 7;

export const LeadsTableSkeleton = ({ rowCount = 5 }: { rowCount?: number }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="animate-pulse">
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
