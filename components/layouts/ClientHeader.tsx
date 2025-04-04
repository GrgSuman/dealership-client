import Link from "next/link"

const ClientHeader = () => {
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 py-4 px-4">
      <header className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="mr-2 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <path d="M9 17h6"></path>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">
              <span>TheFinal</span>
              <span className="text-green-600">Group</span>
            </h1>
            <p className="text-gray-600 text-xs">AI-powered car exploration</p>
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

