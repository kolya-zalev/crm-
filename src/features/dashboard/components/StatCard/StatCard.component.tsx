import { StatCardItem } from "./StatCardItem.component";
import { StatCardProps } from "./StatCard.types";
import { StatCards } from "./utils/StatCard.utils";

export const StatCardComponent = ({ stats }: StatCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-3000 fill-mode-forwards">
      {StatCards.map((card) => (
        <StatCardItem
          key={card.key}
          title={card.title}
          value={stats[card.key]}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
};
