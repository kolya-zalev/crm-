import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCardItemProps } from "./StatCardItem.types";

export const StatCardItem = ({
  title,
  value,
  icon: Icon,
  color,
}: StatCardItemProps) => {
  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="p-2 rounded-md bg-slate-50">
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-4xl font-bold tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
};
