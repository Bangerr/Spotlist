"use client";
import React, { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface ChartDataItem {
  vibe: string;
  value: number;
}

interface VibercheckerProps {
  chartData: ChartDataItem[];
}

const VibeChecker = ({ chartData }: VibercheckerProps) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  useEffect(() => {
    async function fetchMistralVibe() {
      try {
      } catch (err) {
        console.error("Top artists fetching failed Step: ", err);
      }
    }
    fetchMistralVibe();
  }, []);

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Vibe Checker</CardTitle>
        <CardDescription>
          Showing music taste for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full md:max-h-[250px] max-h-fit">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="vibe" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VibeChecker;
