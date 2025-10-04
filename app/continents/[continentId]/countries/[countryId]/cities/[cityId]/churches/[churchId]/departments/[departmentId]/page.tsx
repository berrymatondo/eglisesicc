import { DepartmentDetailsPage } from "@/components/depatments/department-details-page";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{
    continent: string;
    countryId: string;
    cityId: string;
    churchId: string;
    departmentId: string;
  }>;
}) {
  const { continent } = await params;
  const { countryId } = await params;
  const { cityId } = await params;
  const { churchId } = await params;
  const { departmentId } = await params;
  return (
    <DepartmentDetailsPage
      continent={continent}
      country={countryId}
      city={cityId}
      church={churchId}
      department={departmentId}
    />
  );
}
