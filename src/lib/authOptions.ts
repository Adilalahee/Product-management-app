import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
   async authorize(credentials) {
  await connectDB();

  console.log("Received credentials:", credentials);

  const user = await User.findOne({ email: credentials?.email });

  if (!user) {
    console.log("User not found");
    throw new Error("No user found");
  }

  const isValid = await compare(credentials.password, user.password);

  if (!isValid) {
    console.log("Invalid password");
    throw new Error("Invalid password");
  }

  console.log("User authorized:", user.email);
  return { id: user._id, name: user.name, email: user.email };
}
,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect back to login page on error
  },
  secret: process.env.NEXTAUTH_SECRET,
};
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role || "user";
    }
    return token;
  },
  async session({ session, token }) {
    session.user.role = token.role;
    return session;
  },
},
