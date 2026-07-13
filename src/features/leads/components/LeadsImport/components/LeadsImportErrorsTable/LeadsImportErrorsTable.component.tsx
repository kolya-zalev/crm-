import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadImportRowError } from "../../LeadsImport.types";

export const LeadsImportErrorsTableComponent = ({
  errors,
}: {
  errors: LeadImportRowError[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Row</TableHead>
          <TableHead>Field</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {errors.map((error, index) => (
          <TableRow
            key={`${error.row}-${error.field}-${error.message}-${index}`}
          >
            <TableCell>{error.row}</TableCell>
            <TableCell>{error.field}</TableCell>
            <TableCell>{error.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
