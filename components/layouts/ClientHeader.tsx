'use client'
import Link from "next/link"
import { CarFront } from "lucide-react"
import { usePathname } from "next/navigation"

const ClientHeader = () => {
  const path = usePathname()
  const isAdminPath = path?.includes("/admin")

  if (isAdminPath) return null
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 py-4 px-4">
      <header className="flex justify-between items-center">
        {/* Improved Logo */}
        <div className="flex items-center">
          <CarFront className="w-6 h-6 text-green-600 mr-2" />
          <div>
            <h1 className="text-2xl font-[700]">
              <span className="text-gray-900">The</span>
              <span className="text-green-600">Final</span>
              <span className="text-gray-900">Group</span>
            </h1>
            <p className="text-gray-600 text-xs font-mono">AI-powered car exploration</p>
          </div>
        </div>
        
        {/* Auth buttons - kept exactly the same */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/signin" className="text-sm hover:text-gray-800 text-gray-600 font-medium transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-2 rounded-lg transition-colors"
          >
            Create Account
          </Link>
        </div>
      </header>
    </div>
  )
}

export default ClientHeader