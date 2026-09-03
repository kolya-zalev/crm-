import type { TeamMember } from "@/types/team.types";
import teamApi from "@/features/team/api/teamApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useTeamMembers = () => {
  const queryClient = useQueryClient();
  const { data: members = [], isPending } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: () => teamApi.getMembers(),
  });

  const inviteMemberMutation = useMutation({
    mutationFn: ({
      email,
      role,
    }: {
      email: string;
      role: "admin" | "manager" | "member";
    }) => teamApi.inviteMember(email, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });

  const updateMemberMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TeamMember> }) =>
      teamApi.updateMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });

  const inviteMember = (email: string, role: "admin" | "manager" | "member") =>
    inviteMemberMutation.mutateAsync({ email, role });
  const updateMember = (id: string, data: Partial<TeamMember>) =>
    updateMemberMutation.mutateAsync({ id, data });

  return {
    members,
    isLoading: isPending,
    isInviting: inviteMemberMutation.isPending,
    isUpdating: updateMemberMutation.isPending,
    inviteMember,
    updateMember,
  };
};
