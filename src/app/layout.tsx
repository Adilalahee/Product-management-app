import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <nav className="flex gap-4 p-4 bg-gray-200">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/login">Login</Link>
          </nav>
          <main className="p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
