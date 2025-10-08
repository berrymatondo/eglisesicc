import { GroupsPage } from "@/components/groups/groups-page";

export default function GroupsRoute({
  params,
}: {
  params: { continent: string };
}) {
  return <GroupsPage continent={params.continent} />;
}
