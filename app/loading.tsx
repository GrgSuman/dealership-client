import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container max-w-4xl mx-auto py-20 px-4 md:px-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        {/* Main loader */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    </div>
  )
}