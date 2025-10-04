"use server";
import { headers } from "next/headers";
import { auth } from "./auth";

export const getActionSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
};

export const getActionUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return session?.user;
};
