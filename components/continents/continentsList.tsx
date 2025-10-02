"use client";

import { useState } from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContinentCard } from "./continent-card";
import { useRouter } from "next/navigation";
/* import { ChurchDistributionChart } from "@/components/church-distribution-chart";
import { CountryDistributionChart } from "@/components/country-distribution-chart"; */

export interface Continent {
  id: string;
  name: string;
  countries: number;
  churches: number;
  icon: string;
  color: string;
}

const continentsData: Continent[] = [
  {
    id: "africa",
    name: "Afrique",
    countries: 54,
    churches: 120,
    icon: "/africa-continent-map-illustration.jpg",
    color: "bg-[#F4A5B9]",
  },
  {
    id: "asia",
    name: "Asie",
    countries: 48,
    churches: 95,
    icon: "/asia-continent-map-illustration.jpg",
    color: "bg-[#A8D5E2]",
  },
  {
    id: "europe",
    name: "Europe",
    countries: 44,
    churches: 150,
    icon: "/europe-continent-map-illustration.jpg",
    color: "bg-[#F9D89C]",
  },
  {
    id: "america",
    name: "Amérique",
    countries: 35,
    churches: 250,
    icon: "/america-continent-map-illustration.jpg",
    color: "bg-[#A8E6CF]",
  },
  {
    id: "oceania",
    name: "Océanie",
    countries: 14,
    churches: 180,
    icon: "/oceania-continent-map-illustration.jpg",
    color: "bg-[#C9B8E4]",
  },
];

export function ContinentsList() {
  const [sortBy, setSortBy] = useState("countries");
  const router = useRouter();

  const sortedContinents = [...continentsData].sort((a, b) => {
    if (sortBy === "countries") {
      return b.countries - a.countries;
    } else if (sortBy === "churches") {
      return b.churches - a.churches;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-4 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Continents</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full bg-card">
            <div className="flex items-center gap-2">
              <Menu className="h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="countries">Trier par nombre de pays</SelectItem>
            <SelectItem value="churches">Trier par nombre d'églises</SelectItem>
          </SelectContent>
        </Select>

        {/* Continents List */}
        <div className="space-y-3">
          {sortedContinents.map((continent) => (
            <ContinentCard key={continent.id} continent={continent} />
          ))}
        </div>

        {/* Church Distribution Chart */}
        {/*         <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Distribution des Églises par Continent
          </h2>
          <ChurchDistributionChart continents={continentsData} />
        </div> */}

        {/* Country Distribution Chart */}
        {/*         <div className="space-y-4 pb-8">
          <h2 className="text-lg font-semibold text-foreground">
            Distribution des Pays par Continent
          </h2>
          <CountryDistributionChart continents={continentsData} />
        </div> */}
      </main>
    </div>
  );
}
