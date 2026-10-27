import { RolesStatus } from "../Roles.types";
type GetRolesStatusParams = {
  isLoading: boolean;
  isError: boolean;
};

export const getRolesStatus = ({
  isLoading,
  isError,
}: GetRolesStatusParams): RolesStatus => {
  if (isLoading) return RolesStatus.Loading;
  if (isError) return RolesStatus.Error;
  return RolesStatus.Ready;
};
