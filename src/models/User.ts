// Placeholder for User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  emailVerified: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
