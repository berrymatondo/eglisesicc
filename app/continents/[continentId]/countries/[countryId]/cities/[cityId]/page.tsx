import { ChurchesPage } from "@/components/churchies/churches-page";

type CityPageProps = {
  params: Promise<{ continent: string; countryId: string; cityId: string }>;
};
export default async function CityPage({ params }: CityPageProps) {
  const { continent } = await params;
  const { countryId } = await params;
  const { cityId } = await params;

  return (
    <ChurchesPage continent={continent} country={countryId} city={cityId} />
  );
}
