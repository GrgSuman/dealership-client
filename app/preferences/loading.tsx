import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 pt-3">
      {/* Header Skeleton */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-40 border-b border-gray-200 -mx-4 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-4">
          {/* Budget Section Skeleton */}
          <div className="p-5 py-3 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-2 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-16 w-32" />
                <Skeleton className="h-16 w-32" />
              </div>
            </div>
          </div>

          {/* Car Types Section Skeleton */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>

          {/* Fuel Types Section Skeleton */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>

          {/* Brands Section Skeleton */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>

          {/* Features Section Skeleton */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-32" />
              ))}
            </div>
          </div>

          {/* Primary Use Section Skeleton */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-28" />
              ))}
            </div>
          </div>

          {/* Top Priorities Section Skeleton */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-28" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-28" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

