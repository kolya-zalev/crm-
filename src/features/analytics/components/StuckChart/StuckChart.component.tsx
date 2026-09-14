"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { StuckChartComponentProps } from "./StuckChart.types";
import { stuckConfig } from "./utils/stuckConfig";

export const StuckChartComponent = ({
  data,
  hasStuck,
  thresholdDays,
}: StuckChartComponentProps) => {
  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Stuck leads</CardTitle>
        <CardDescription>
          No status change for more than {thresholdDays} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasStuck ? (
          <p className="text-sm text-muted-foreground">No stuck leads.</p>
        ) : (
          <div className="w-full" style={{ height: 250 }}>
            <ChartContainer
              config={stuckConfig}
              className="aspect-auto h-full w-full"
            >
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Pie data={data} dataKey="count" nameKey="status">
                  {data.map((slice) => (
                    <Cell
                      key={slice.status}
                      fill={`var(--color-${slice.status})`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
