"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Continent } from "../continents/continentsList";

interface ChurchDistributionChartProps {
  continents: Continent[];
}

export function ChurchDistributionChart({
  continents,
}: ChurchDistributionChartProps) {
  const chartData = continents.map((continent) => ({
    name: getShortName(continent.name),
    churches: continent.churches,
    fill: getChartColor(continent.id),
  }));

  return (
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            ticks={[0, 50, 100, 150, 200, 250]}
          />
          <Bar dataKey="churches" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function getShortName(name: string): string {
  const shortNames: Record<string, string> = {
    Afrique: "Afrique",
    Asie: "Asie",
    Europe: "Europe",
    Amérique: "Amérique",
    Océanie: "Océanie",
  };
  return shortNames[name] || name;
}

function getChartColor(id: string): string {
  const colors: Record<string, string> = {
    africa: "#F4A5B9",
    asia: "#A8D5E2",
    europe: "#F9D89C",
    america: "#A8E6CF",
    oceania: "#C9B8E4",
  };
  return colors[id] || "#A8D5E2";
}
