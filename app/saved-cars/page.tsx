"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import VehicleGrid from "@/components/sections/VehicleGrid"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function SavedCarsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }
    setIsLoading(false)
  }, [router])

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Saved Vehicles</h1>
      </div>
      <VehicleGrid />
    </div>
  )
}