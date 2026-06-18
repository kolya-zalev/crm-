import { Button } from "@/components/ui/button";
import { PageSizeOptions } from "../../LeadsTable.constants";

export interface LeadsTablePaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const LeadsTablePagination = ({
  page,
  pageCount,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: LeadsTablePaginationProps) => {
  if (total === 0) {
    return null;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const handlePrev = () => {
    onPageChange(page - 1);
  };

  const handleNext = () => {
    onPageChange(page + 1);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {total}
      </p>

      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground" htmlFor="page-size">
          Rows
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="rounded-md border border-input bg-background px-2 py-1 text-sm"
        >
          {PageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={handlePrev}
        >
          Prev
        </Button>
        <span className="text-sm">
          Page {page} of {pageCount}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= pageCount}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
