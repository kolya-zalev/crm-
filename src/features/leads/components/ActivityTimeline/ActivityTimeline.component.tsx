import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { activityIcons } from "./utils/activityIcons.utils";
import { ActivityTimelineComponentProps } from "./ActivityTimeline.types";

export function ActivityTimelineComponent({
  activities,
  isLoading,
}: ActivityTimelineComponentProps) {
   if (isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );

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
            activities.map((activity) => {
              const icon = activityIcons[activity.type];
              return (
                <div key={activity.id} className="flex items-start gap-3 py-3">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="text-sm">{activity.description}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
