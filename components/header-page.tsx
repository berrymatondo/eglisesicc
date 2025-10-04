import { getUser } from "@/lib/auth-server";
import { HeaderClient } from "./header";

export default async function HeaderPage() {
  const user = await getUser(); // ✅ côté serveur, pas de flash

  return <HeaderClient user={user} />;
}
