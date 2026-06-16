import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityTimelineComponentProps } from "./ActivityTimeline.types";
import { Spinner } from "@/components/ui/spinner";
import { ActivityItem } from "./components/ActivityItem/ActivityItem.component";

export const ActivityTimelineComponent = ({
  activities,
  isLoading,
}: ActivityTimelineComponentProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y max-h-80 overflow-y-auto">
          {activities.length === 0 ? (
            <p>No activity yet</p>
          ) : (
            activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
