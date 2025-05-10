"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, CreditCard, Heart, HelpCircle, Settings, Menu, X, LogIn, UserPlus, TrendingUp, Bot, Home, GitCompare } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => (
  <Link href={href} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
    {icon}
    <span>{label}</span>
  </Link>
)

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  const path = usePathname()
  const isAdminPath = path?.includes("/admin")

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user")
      if (user) {
        const userData = JSON.parse(user)
        setIsLoggedIn(true)
        setUserName(userData.firstName)
      } else {
        setIsLoggedIn(false)
        setUserName("")
      }
    }

    checkUser()
    window.addEventListener("userChanged", checkUser)
    return () => window.removeEventListener("userChanged", checkUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    toast.success("Logged out successfully")
    window.dispatchEvent(new Event("userChanged"))
    router.push("/login")
  }

  if (isAdminPath) return null

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-white border border-gray-100"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile auth buttons */}
          <div className="md:hidden p-4 border-b border-gray-100">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-2">
                <span className="text-gray-700 font-medium">{userName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <SidebarItem icon={<LogIn />} label="Sign In" href="/login" />
                <SidebarItem icon={<UserPlus />} label="Create Account" href="/signup" />
              </div>
            )}
          </div>

          {/* Main navigation area */}
          <div className="flex-grow p-4">
            <nav className="space-y-1 mb-5">
              <SidebarItem icon={<Home size={16} />} label="Home" href="/" />
              <SidebarItem icon={<Heart size={16} />} label="Saved Cars" href="/saved-cars" />
            </nav>

            <div className="mb-5">
              <h2 className="mb-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Explore</h2>
              <nav className="space-y-1">
                <SidebarItem icon={<TrendingUp size={16} />} label="Popular" href="/popular-cars" />
                <SidebarItem icon={<Bot size={16} />} label="Explore with AI" href="/explore-with-ai" />
                <SidebarItem icon={<Search size={16} />} label="Search Cars" href="/search-cars" />
                <SidebarItem icon={<GitCompare size={16} />} label="Compare Cars" href="/compare-cars" />
                <SidebarItem icon={<CreditCard size={16} />} label="Financing Options" href="/finance" />
              </nav>
            </div>

            <div className="mb-5">
              <h2 className="mb-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Other</h2>
              <nav className="space-y-1">
                <SidebarItem icon={<HelpCircle size={16} />} label="Help & Support" href="/help" />
                <SidebarItem icon={<Settings size={16} />} label="Preferences" href="/preferences" />
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}