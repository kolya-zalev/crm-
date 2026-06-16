import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsByStatusProps } from "./LeadsByStatus.types";
import { StatusBars, getStatusPercent } from "./utils/LeadsByStatus.utils";
import { LeadsByStatusBar } from "./components/LeadsByStatusBar/LeadsByStatusBar.component";

export const LeadsByStatusComponent = ({ stats }: LeadsByStatusProps) => {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-2000 fill-mode-forwards shadow-xs hover:shadow-xl transition-shadow shadow-red-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          Leads by Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {StatusBars.map((bar) => (
            <LeadsByStatusBar
              key={bar.status}
              label={bar.label}
              color={bar.color}
              count={stats[bar.status]}
              percent={getStatusPercent(stats[bar.status], stats.total)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
