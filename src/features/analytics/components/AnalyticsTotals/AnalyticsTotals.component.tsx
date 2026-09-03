import { AnalyticsCardTotals } from "./utils/AnalyticsTotals.utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsTotalsProps } from "./AnalyticsTotals.types";

export const AnalyticsTotalsComponent = ({ totals }: AnalyticsTotalsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-3000 fill-mode-forwards">
      {AnalyticsCardTotals.map((card) => {
        const Icon = card.icon;
        const value = totals[card.key];

        return (
          <Card
            key={card.key}
            className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-medium text-muted-foreground uppercase tracking-wider">
                {card.title}
              </CardTitle>
              <div className="p-2 rounded-md bg-slate-50">
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-4xl font-bold tracking-tight">
                {value}
                {card.suffix}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
