"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You are not authenticated.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <p>Only admins can see this.</p>
    </div>
  );
}
