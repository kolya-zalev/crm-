import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityTimelineComponentProps } from "./ActivityTimeline.types";
import { Star, RefreshCw, NotebookPen, Trash, Pencil } from "lucide-react";


const activityIcons: Record<string, React.ReactNode> = {
  lead_created: <Star className="size-4 text-yellow-500" />,
  status_changed: <RefreshCw className="size-4 text-blue-500" />,
  note_added: <NotebookPen className="size-4 text-green-500" />,
  note_deleted: <Trash className="size-4 text-red-500" />,
  lead_updated: <Pencil className="size-4 text-purple-500" />,
};
export function ActivityTimelineComponent({
  activities,
  isLoading,
}: ActivityTimelineComponentProps) {
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
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
