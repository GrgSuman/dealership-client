"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Sidebar from "@/components/layouts/Sidebar"
import ClientHeader from "@/components/layouts/ClientHeader"

export default function HelpPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Help & Support</h1>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">How do I save a vehicle?</h3>
                  <p className="text-gray-600">Click the heart icon on any vehicle card to save it to your favorites.</p>
                </div>
                <div>
                  <h3 className="font-medium">How do I contact support?</h3>
                  <p className="text-gray-600">You can reach our support team at support@dealership.com</p>
                </div>
                <div>
                  <h3 className="font-medium">What payment methods do you accept?</h3>
                  <p className="text-gray-600">We accept all major credit cards and bank transfers.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}