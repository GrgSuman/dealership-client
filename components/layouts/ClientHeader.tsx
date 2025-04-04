import Link from "next/link"

const ClientHeader = () => {
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 py-4 px-4">
      <header className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              <span className="text-gray-900 font-mono">The</span>
              <span className="text-green-600 font-mono">Final</span>
              <span className="text-gray-900 font-mono">Group</span>
            </h1>
            <p className="text-gray-600 text-xs font-mono">AI-powered car exploration</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Link href="/signin" className="text-sm hover:text-gray-800 text-gray-600 font-medium transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
          >
            Create Account
          </Link>
        </div>
      </header>
    </div>
  )
}

export default ClientHeader

