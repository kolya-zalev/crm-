import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/features/leads/api/usersApi";

export const useAssignable = () => {
  const { data: users = [], isPending } = useQuery({
    queryKey: ["assignable"],
    queryFn: () => usersApi.getUsers(),
    retry: false,
  });
  return { users, isLoading: isPending };
};
