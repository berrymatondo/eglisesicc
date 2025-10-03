import { CountriesPage } from "@/components/countries/countries-page";
import React from "react";

export default async function ContinentPage({
  params,
}: {
  params: Promise<{ continentId: string }>;
}) {
  const { continentId } = await params;

  return <CountriesPage continent={continentId} />;
}
