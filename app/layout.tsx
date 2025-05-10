import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/layouts/ClientHeader";
import Sidebar from "@/components/layouts/Sidebar";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Final Group",
  description: "AI-powered car exploration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen bg-gray-50">
            <ClientHeader />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
