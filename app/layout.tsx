import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

import { AuthProvider, useAuth } from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insight Lab API",
  description: "Created by Artur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-white dark:bg-[#121212]")}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
