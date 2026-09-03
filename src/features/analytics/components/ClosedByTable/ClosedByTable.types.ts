import type { Analytics } from "@/types/analytics";

export interface ClosedByTableProps {
  closedBy: Analytics["closedBy"];
  closedBeforeTracking: number;
}
