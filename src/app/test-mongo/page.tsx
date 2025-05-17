import { connectDB } from "@/lib/db";

export default async function TestMongo() {
  await connectDB();
  return <div className="p-4 text-green-600">MongoDB Connected ✅</div>;
}