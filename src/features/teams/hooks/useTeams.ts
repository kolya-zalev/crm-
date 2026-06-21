import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import teamsApi from "../teamsApi";
import type { InviteUserDto, UpdateMemberDto } from "../teams.types";

export const useTeams = () => {
  const queryClient = useQueryClient();

  const { data: members = [], isPending } = useQuery({
    queryKey: ["team", "members"],
    queryFn: () => teamsApi.getMembers(),
  });

  const inviteMutation = useMutation({
    mutationFn: (data: InviteUserDto) => teamsApi.inviteUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", "members"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberDto }) =>
      teamsApi.updateMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", "members"] });
    },
  });

  return {
    members,
    isLoading: isPending,
    inviteUser: inviteMutation.mutateAsync,
    updateMember: updateMutation.mutateAsync,
  };
};