import { ChurchesPage } from "@/components/churchies/churches-page";

export default async function CityPage({
  params,
}: {
  params: { continent: string; countryId: string; cityId: string };
}) {
  const { continent } = await params;
  const { countryId } = await params;
  const { cityId } = await params;

  return (
    <ChurchesPage continent={continent} country={countryId} city={cityId} />
  );
}
