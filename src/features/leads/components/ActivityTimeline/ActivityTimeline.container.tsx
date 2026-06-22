import { useActivities } from "@/features/hooks/useActivities";
import { ActivityTimelineProps } from "./ActivityTimeline.types";
import { ActivityTimelineComponent } from "./ActivityTimeline.component";

export function ActivityTimelineContainer({ leadId }: ActivityTimelineProps) {
  const { activities, isLoading } = useActivities(leadId);
  return (
    <ActivityTimelineComponent activities={activities} isLoading={isLoading} />
  );
}
