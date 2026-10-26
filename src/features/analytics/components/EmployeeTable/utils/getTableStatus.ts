import { TableStatus } from "../EmployeeTable.types";

type GetTableStatusParams = {
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  rowsCount: number;
};

export const getTableStatus = ({
  isLoading,
  isError,
  hasData,
  rowsCount,
}: GetTableStatusParams): TableStatus => {
  if (isLoading) return TableStatus.Loading;
  if (isError || !hasData) return TableStatus.Error;
  if (rowsCount === 0) return TableStatus.Empty;
  return TableStatus.Ready;
};
