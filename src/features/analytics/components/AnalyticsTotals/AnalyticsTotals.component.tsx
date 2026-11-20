import { AnalyticsCardTotals } from "./utils/AnalyticsTotals.utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsTotalsProps } from "./AnalyticsTotals.types";

export const AnalyticsTotalsComponent = ({ totals }: AnalyticsTotalsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {AnalyticsCardTotals.map((card) => {
        const Icon = card.icon;
        const value = totals[card.key];

        return (
          <Card key={card.key} className="gap-2 py-4 rounded-2xl ">
            <CardHeader className="flex flex-row items-center justify-between gap-2 px-4">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`size-4 shrink-0 ${card.color}`} />
            </CardHeader>
            <CardContent className="px-4">
              <p className="text-2xl font-semibold tabular-nums tracking-tight">
                {value}
                {card.suffix}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
