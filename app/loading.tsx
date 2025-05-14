import { Skeleton } from "@/components/ui/skeleton"
import { LayoutGrid, List } from "lucide-react"

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <div className="p-2 rounded-md bg-white shadow-sm">
            <LayoutGrid className="h-5 w-5 text-green-600" />
          </div>
          <div className="p-2 rounded-md">
            <List className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Vehicle Count */}
      <Skeleton className="h-5 w-32 mb-4" />

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="relative h-48 w-full">
              <Skeleton className="absolute inset-0" />
              <div className="absolute top-2 right-2">
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Title and Price */}
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>

              {/* Vehicle Details */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

