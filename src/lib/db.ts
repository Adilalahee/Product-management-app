// Placeholder for db.ts
import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Please add your Mongo URI to .env.local");

  await mongoose.connect(uri);
}
