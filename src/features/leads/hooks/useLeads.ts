import type { Lead, NewLead } from "@/types";
import leadsApi from "@/features/leads/api/leadsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type UseLeadsOptions = {
  enabled?: boolean;
};

export const useLeads = (options?: UseLeadsOptions) => {
  const queryClient = useQueryClient();
  const { data: leads = [], isPending } = useQuery({
    queryKey: ["leads"],
    queryFn: () => leadsApi.getLeads(),
    enabled: options?.enabled ?? true,
  });

  const createLeadMutation = useMutation({
    mutationFn: (data: NewLead) => leadsApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: (id: string) => leadsApi.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Lead> & { assignedToId?: string | null };
    }) => leadsApi.updateLead(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["leads", id] });
      queryClient.invalidateQueries({ queryKey: ["leads", id, "activities"] });
    },
  });

  const createLead = (data: NewLead) => createLeadMutation.mutateAsync(data);
  const deleteLead = (id: string) => deleteLeadMutation.mutateAsync(id);
  const updateLead = (
    id: string,
    data: Partial<Lead> & { assignedToId?: string | null },
  ) => updateLeadMutation.mutateAsync({ id, data });

  return { leads, isLoading: isPending, createLead, deleteLead, updateLead };
};
