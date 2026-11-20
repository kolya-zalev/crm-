import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statCard } from "./utils/StatCard/StatCard.utils";
import { StatCardProps } from "./StatCard.types";

export const StatCardComponent = ({ stats }: StatCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-3000 fill-mode-forwards lg:grid-cols-4">
      {statCard.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];

        return (
          <Card
            key={card.key}
            className="gap-2 rounded-2xl py-4 shadow-sm hover:shadow-xl transition-shadow shadow-blue-200  "
          >
            <CardHeader className="flex flex-row items-center justify-between gap-2 px-4">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`size-4 shrink-0 ${card.color}`} />
            </CardHeader>
            <CardContent className="px-4">
              <p className="text-2xl font-semibold tabular-nums tracking-tight">
                {value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
