import { CitiesPage } from "@/components/cities/cities-page";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ continent: string; countryId: string }>;
}) {
  const { continent } = await params;
  const { countryId } = await params;
  return <CitiesPage continent={continent} country={countryId} />;
}
