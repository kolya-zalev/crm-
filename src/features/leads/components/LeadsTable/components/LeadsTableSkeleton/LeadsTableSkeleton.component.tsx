import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const SkeletonRows = 5;

export const LeadsTableSkeleton = () => {
  return Array.from({ length: SkeletonRows }).map((_, index) => (
    <TableRow key={`skeleton-${index}`} className="animate-pulse">
      <TableCell className="p-3">
        <Skeleton className="mx-auto h-4 w-24 rounded" />
      </TableCell>
      <TableCell className="p-3">
        <Skeleton className="mx-auto h-4 w-36 rounded" />
      </TableCell>
      <TableCell className="p-3">
        <Skeleton className="mx-auto h-4 w-28 rounded" />
      </TableCell>
      <TableCell className="p-3">
        <Skeleton className="mx-auto h-4 w-20 rounded" />
      </TableCell>
      <TableCell className="p-3">
        <Skeleton className="mx-auto h-6 w-16 rounded-full" />
      </TableCell>
      <TableCell className="p-3">
        <Skeleton className="mx-auto h-4 w-8 rounded" />
      </TableCell>
      <TableCell className="p-3">
        <div className="flex flex-row justify-center gap-1">
          <Skeleton className="h-8 w-8 rounded-xl" />
          <Skeleton className="h-8 w-8 rounded-xl" />
          <Skeleton className="h-8 w-8 rounded-xl" />
        </div>
      </TableCell>
    </TableRow>
  ));
};
