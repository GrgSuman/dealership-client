"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/dashboard/AdminHeader"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminHeader />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}