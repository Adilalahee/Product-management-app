// src/app/dashboard/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/profile">Profile</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
