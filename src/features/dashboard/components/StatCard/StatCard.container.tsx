import { StatCardComponent } from "./StatCard.component";
import { StatCardProps } from "./StatCard.types";

export const StatCardContainer = ({ stats }: StatCardProps) => {
  return <StatCardComponent stats={stats} />;
}