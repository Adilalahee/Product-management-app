// Placeholder for seedAdmin.ts
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
console.log('Mongo URI:', process.env.MONGODB_URI);
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}



const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("users");

    const existingAdmin = await users.findOne({ email: "admin@example.com" });

    if (!existingAdmin) {
      await users.insertOne({
        name: "Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        emailVerified: new Date(),
      });
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    await client.close();
  }
}

main();
