import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const LeadsTableSkeleton = ({ rowCount = 5, columnsCount = 7 }) => {
  const rowItems = Array.from({ length: rowCount });
  const cellItems = Array.from({ length: columnsCount });
  return (
    <>
      {rowItems.map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="animate-pulse">
          {cellItems.map((__, cellIndex) => (
            <TableCell key={cellIndex} className="p-3">
              <Skeleton className="mx-auto h-4 w-24 rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
  