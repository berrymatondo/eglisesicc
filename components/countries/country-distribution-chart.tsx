"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { Continent } from "../continents/continentsList"

interface CountryDistributionChartProps {
  continents: Continent[]
}

export function CountryDistributionChart({ continents }: CountryDistributionChartProps) {
  const chartData = continents.map((continent) => ({
    name: getShortName(continent.name),
    countries: continent.countries,
    fill: getChartColor(continent.id),
  }))

  return (
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
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
            ticks={[0, 10, 20, 30, 40, 50, 60]}
          />
          <Bar dataKey="countries" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

function getShortName(name: string): string {
  const shortNames: Record<string, string> = {
    Afrique: "Afrique",
    Asie: "Asie",
    Europe: "Europe",
    Amérique: "Amérique",
    Océanie: "Océanie",
  }
  return shortNames[name] || name
}

function getChartColor(id: string): string {
  const colors: Record<string, string> = {
    africa: "#F9D89C",
    asia: "#F4A5B9",
    europe: "#A8D5E2",
    america: "#F9D89C",
    oceania: "#A8E6CF",
  }
  return colors[id] || "#A8D5E2"
}
