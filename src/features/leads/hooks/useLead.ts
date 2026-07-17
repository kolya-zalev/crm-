import leadsApi from "@/features/leads/api/leadsApi";
import { useQuery } from "@tanstack/react-query";

export const useLead = (leadId: string) => {
  const {
    data: lead,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["leads", leadId],
    queryFn: () => leadsApi.getLeadById(leadId),
    enabled: Boolean(leadId),
  });

  return { lead, isLoading: isPending, isError };
};
