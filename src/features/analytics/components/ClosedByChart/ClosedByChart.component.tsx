"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ClosedByChartComponentProps } from "./ClosedByChart.types";
import { barColors, chartConfig } from "./utils/chartConfig";

export const ClosedByChartComponent = ({
  closedBy,
}: ClosedByChartComponentProps) => {
  return (
    <Card className="shadow-sm hover:shadow-xl transition-shadow shadow-blue-200">
      <CardHeader>
        <CardDescription>Leads closed per person</CardDescription>
      </CardHeader>
      <CardContent>
        {closedBy.length === 0 ? (
          <p className="text-sm text-muted-foreground">No closings yet.</p>
        ) : (
          <div className="w-full" style={{ height: 250 }}>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-full w-full"
            >
              <BarChart
                accessibilityLayer
                data={closedBy}
                barCategoryGap="40%"
                maxBarSize={48}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="userName"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="total" radius={8}>
                  {closedBy.map((user, index) => (
                    <Cell
                      key={user.userId}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
