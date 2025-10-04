import { CitiesPage } from "@/components/cities/cities-page";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ continentId: string; countryId: string }>;
}) {
  const { continentId } = await params;
  const { countryId } = await params;

  return <CitiesPage continent={continentId} country={countryId} />;
}
