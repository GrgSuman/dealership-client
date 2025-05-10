"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Sidebar from "@/components/layouts/Sidebar"
import ClientHeader from "@/components/layouts/ClientHeader"

export default function ExplorePage() {
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
                            <h1 className="text-3xl font-bold">AI Vehicle Exploration</h1>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600">AI exploration feature coming soon...</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
} 