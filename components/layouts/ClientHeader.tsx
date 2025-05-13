"use client";
import Link from "next/link";
import { CarFront } from "lucide-react";
import { usePathname } from "next/navigation";

const ClientHeader = () => {
  const path = usePathname();
  const isAdminPath = path?.includes("/admin");

  if (isAdminPath) return null;
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 py-4 px-4">
      <header className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative">
              {/* Modern Car Icon */}
              <div className="relative w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
            </div>

            <div className="ml-3">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-gray-900">The</span>
                <span className="text-green-600">Final</span>
                <span className="text-gray-900">Group</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Auth buttons - kept exactly the same */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/signin"
            className="text-sm hover:text-gray-800 text-gray-600 font-medium transition-colors"
          >
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
  );
};

export default ClientHeader;
