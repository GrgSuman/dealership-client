import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/layouts/ClientHeader";
import Sidebar from "@/components/layouts/Sidebar";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Dealership",
  description: "The next generation car search engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          <div className="flex h-screen flex-col">
            <ClientHeader />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              {/* p-6 */}
              <main className="flex-1 overflow-auto ">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
