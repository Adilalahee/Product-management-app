// src/lib/session.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth"; // your NextAuth options

export async function getSession() {
  return await getServerSession(authOptions);
}
