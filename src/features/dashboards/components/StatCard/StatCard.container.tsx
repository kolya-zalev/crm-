import { StatCardComponent } from "./StatCard.component";
import { StatCardProps } from "./StatCard.types";

export function StatCardContainer({ stats }: StatCardProps) {
  return <StatCardComponent stats={stats} />;
}