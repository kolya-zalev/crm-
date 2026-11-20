import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TableCellLoadingProps } from "./TableCellLoading.types";

export const TableCellLoadingComponent = ({
  colSpan,
}: TableCellLoadingProps) => (
  <TableRow className="hover:bg-transparent">
    <TableCell colSpan={colSpan} className="py-10 text-center">
      <Spinner className="mx-auto size-6" />
    </TableCell>
  </TableRow>
);
