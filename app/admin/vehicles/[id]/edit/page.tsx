"use client"

import { Suspense } from "react"
import VehicleFormPage from "../../addEdit/page"

export default function EditVehiclePage({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        }>
            <VehicleFormPage />
        </Suspense>
    )
} 