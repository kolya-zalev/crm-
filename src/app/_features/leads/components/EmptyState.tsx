import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message = "No leads found" }: EmptyStateProps) => {
  return (
    <TableRow>
      <TableCell
        colSpan={7}
        className="py-8 text-center text-gray-500 font-medium"
      >
        {message}
      </TableCell>
    </TableRow>
  );
};
