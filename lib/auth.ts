import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(), // ✅ activation du plugin Next.js
  ],
});
