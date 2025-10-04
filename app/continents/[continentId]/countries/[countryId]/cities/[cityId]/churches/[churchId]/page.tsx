import { DepartmentsPage } from "@/components/depatments/departments-page";

interface PageProps {
  params: Promise<{
    continent: string;
    countryId: string;
    cityId: string;
    churchId: string;
  }>;
}

export default async function ChurchPage({ params }: PageProps) {
  //const { continent, countryId, cityId } = await params
  const { continent } = await params;
  const { countryId } = await params;
  const { cityId } = await params;
  const { churchId } = await params;

  return (
    <DepartmentsPage
      continent={continent}
      country={countryId}
      city={cityId}
      church={churchId}
    />
  );
}
