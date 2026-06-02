import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsByStatusProps } from "./LeadsByStatus.types";

export const statusBars  = [
  { status: "new", label: "New", color: "bg-blue-500" },
  { status: "contacted", label: "Contacted", color: "bg-sky-500" },
  { status: "qualified", label: "Qualified", color: "bg-purple-500" },
  { status: "won", label: "Won", color: "bg-green-500" },
  { status: "lost", label: "Lost", color: "bg-red-500" },
];

export function LeadsByStatusComponent({stats}: LeadsByStatusProps){
    return(
        
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-2000  fill-mode-forwards  shadow-xs hover:shadow-xl transition-shadow shadow-red-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Leads by Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {statusBars.map((bar) => {
                      const count = stats[bar.status];
                      const percent =
                        stats.total === 0 ? 0 : Math.round((count / stats.total) * 100);
        
                      return (
                        <div key={bar.status} className="flex items-center gap-3">
                          <span className="w-24 text-sm">{bar.label}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${bar.color} rounded-full h-2 `}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-sm font-medium ">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            
    )
}