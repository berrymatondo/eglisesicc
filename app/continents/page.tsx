import React from "react";
import { ContinentsList } from "@/components/continents/continentsList";
import { redirect, unauthorized } from "next/navigation";
import { getUser } from "@/lib/auth-server";

const ContinentsPage = async () => {
  const user = await getUser();

  if (!user) {
    //return unauthorized();
    redirect("/auth/signin");
  }
  return (
    <div>
      <ContinentsList />
    </div>
  );
};

export default ContinentsPage;
