import { formatDateTime } from "@/utils/formatDate";
import { ActivityIcons } from "../../ActivityTimeline.constants";
import { ActivityItemProps } from "./ActivityItem.types";

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const icon = ActivityIcons[activity.type];

  return (
    <div className="flex items-start gap-3 py-3">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-sm">{activity.description}</p>
        <span className="text-xs text-muted-foreground">
          {formatDateTime(activity.createdAt)}
        </span>
      </div>
    </div>
  );
};
