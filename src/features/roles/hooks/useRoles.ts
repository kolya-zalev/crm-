import { useQuery } from "@tanstack/react-query";
import rolesApi from "../api/rolesApi";

export const useRoles = () => {
  const {
    data: roles = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () => rolesApi.getRoles(),
  });

  return { roles, isLoading: isPending, isError };
};
