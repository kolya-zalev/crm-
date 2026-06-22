
import { Lead } from "@/hooks/types";
import leadsApi from "@/services/leadsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useLeads() {
  const queryClient = useQueryClient();
  const {data: leads = [], isPending} = useQuery({
    queryKey: ["leads"],
    queryFn: () => leadsApi.getLeads(),
  });

  const createLeadMutation = useMutation({
    mutationFn: (data: Omit<Lead, 'id'>) => leadsApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['leads']})
    }
  })

  const deleteLeadMutation = useMutation({
    mutationFn: (id: string) => leadsApi.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['leads']})
    }
  })


  const updateLeadMutation = useMutation({
    mutationFn: ({id, data}: {id: string, data: Partial<Lead>}) => leadsApi.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['leads']})
    }
  })

  const createLead = (data: Omit<Lead, 'id'>) => createLeadMutation.mutateAsync(data)
  const deleteLead = (id: string) => deleteLeadMutation.mutateAsync(id)
  const updateLead = (id: string, data: Partial<Lead>) => updateLeadMutation.mutateAsync({id, data})


  return {leads, isLoading: isPending, createLead, deleteLead, updateLead}
}