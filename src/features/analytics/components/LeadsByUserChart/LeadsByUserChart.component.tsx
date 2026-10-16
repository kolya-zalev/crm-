"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { barColorsLeads, chartConfigLeads } from "./utils/chartConfigLeads";
import { LeadsByUserChartComponentProps } from "./LeadsByUserChart.types";
export const LeadsByUserChartComponent = ({
  leadsByUser,
}: LeadsByUserChartComponentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Leads per user</CardTitle>
        <CardDescription>
          The length of the bar is the number of leads assigned to the user.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {leadsByUser.length === 0 ? (
          <p className="text-sm text-muted-foreground">No leads yet.</p>
        ) : (
          <div
            className="w-full"
            style={{ height: Math.max(220, leadsByUser.length * 40) }}
          >
            <ChartContainer
              config={chartConfigLeads}
              className="aspect-auto h-full w-full"
            >
              <BarChart
                accessibilityLayer
                data={leadsByUser}
                barCategoryGap="40%"
                maxBarSize={48}
                layout="vertical"
              >
                <CartesianGrid horizontal={false} />
                <XAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  type="number"
                  allowDecimals={false}
                />
                <YAxis
                  dataKey="userName"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  type="category"
                  width={120}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="leadCount" radius={8}>
                  {leadsByUser.map((user, index) => (
                    <Cell
                      key={user.userId ?? "unassigned"}
                      fill={barColorsLeads[index % barColorsLeads.length]}
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
