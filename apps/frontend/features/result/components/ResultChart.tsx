"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import { getResult } from "../data/result";
import { useQuery } from "@tanstack/react-query";
import * as _ from "lodash";

export const description = "A bar chart with an active bar";

const chartConfig = {
  score: {
    label: "分數",
  },
  author: {
    label: "攝影師",
  },
} satisfies ChartConfig;

// Add color array for the bars
const barColors = [
  "#B33F62", // Blue
];

export function ResultChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["result"],
    queryFn: async () => await getResult(),
  });
  if (isError) return <div>Error</div>;
  if (isLoading || !data) return <div>Loading...</div>;

  const chartData = Object.entries(data.result).map(
    ([author, score], index) => ({
      author,
      score: Number(score),
      fill: barColors[index % barColors.length], // Assign colors cyclically
    }),
  );

  return (
    <section>
      <div className="container mx-auto my-8">
        <h2 className="font-kiwimaru text-center text-xl leading-relaxed tracking-wide">
          我正式宣布，今次攝影比賽的勝出者是：
          <br />
          <span className="font-dale mt- text-4xl">
            {_.maxBy(chartData, "score")?.author}
          </span>
        </h2>
      </div>
      <div className="container mx-auto flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="m-10 mt-6 h-[40vh] w-full lg:mx-0 lg:w-fit"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 2"
              stroke="#a6a6a6"
            />
            <XAxis
              dataKey="author"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="score"
              strokeWidth={2}
              radius={8}
              fill="#FF6B6B" // Default color
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </section>
  );
}
