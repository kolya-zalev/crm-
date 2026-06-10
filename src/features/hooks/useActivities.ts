import activitiesApi from "@/services/activitiesApi";
import { useQuery } from "@tanstack/react-query";

export function useActivities(leadId: string) {
  const {data: activities = [], isPending} = useQuery({
    queryKey: ["leads", leadId, "activities"],
    queryFn: () => activitiesApi.getActivitiesByLead(leadId),
  });

  return { activities, isLoading: isPending }
}
