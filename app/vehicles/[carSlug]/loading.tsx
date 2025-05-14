import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Image Gallery */}
            <div className="relative h-[500px] w-full">
              <Skeleton className="absolute inset-0" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 p-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-24 rounded-md" />
              ))}
            </div>

            <div className="p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20" />
                ))}
              </div>

              {/* Description */}
              <Skeleton className="h-7 w-32 mb-3" />
              <Skeleton className="h-20 w-full mb-6" />

              {/* Features */}
              <Skeleton className="h-7 w-24 mb-3" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Price and Title Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-5 w-24 mb-4" />
              <Skeleton className="h-10 w-32 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Vehicle Details Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <Skeleton className="h-7 w-32 mb-4" />

              <div className="space-y-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}

                {/* Separators */}
                <div className="my-3">
                  <Skeleton className="h-[1px] w-full" />
                </div>

                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}

                <div className="my-3">
                  <Skeleton className="h-[1px] w-full" />
                </div>

                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
