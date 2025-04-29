"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, CreditCard, Heart, HelpCircle, Settings, Menu, X, LogIn, UserPlus, TrendingUp, Bot, Home, GitCompare } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const path = usePathname()
  const isAdminPath = path?.includes("/admin")

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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile auth buttons */}
          <div className="md:hidden p-4 border-b border-gray-100">
            <div className="flex space-x-2">
              <Link
                href="/signin"
                className="flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-md text-sm text-gray-700 border border-gray-200 hover:bg-gray-50"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-md text-sm bg-green-600 text-white hover:bg-green-700"
              >
                <UserPlus size={16} />
                <span>Create Account</span>
              </Link>
            </div>
          </div>

          {/* Main navigation area - with flex-grow to push AI chat to bottom */}
          <div className="flex-grow p-4">
            <nav className="space-y-1 mb-5">
              <SidebarItem path="/" icon={<Home size={16}/>} label="Home" />
              <SidebarItem path="/saved-cars" icon={<Heart size={16} />} label="Saved Cars" />
            </nav>
            
            <div className="mb-5">
              <h2 className="mb-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Explore</h2>
              <nav className="space-y-1">
                <SidebarItem path="/popular-cars" icon={<TrendingUp size={16}/>} label="Popular" />
                <SidebarItem path="/explore-with-ai" icon={<Bot size={16} />} label="Explore with AI" />
                <SidebarItem path="/search-cars" icon={<Search size={16} />} label="Search Cars" />
                <SidebarItem path="/compare-cars" icon={<GitCompare size={16} />} label="Compare Cars" />
                <SidebarItem path="/finance" icon={<CreditCard size={16} />} label="Financing Options" />
              </nav>
            </div>
          
            <div>
              <h2 className="mb-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Other</h2>
              <nav className="space-y-1">
                <SidebarItem path="/help" icon={<HelpCircle size={16} />} label="Help & Support" />
                <SidebarItem path="/preferences" icon={<Settings size={16} />} label="Preferences" />
              </nav>
            </div>
          </div>

          {/* AI assistant promo - now properly stuck to the bottom */}
          {/* <div className="p-4 mt-auto border-t border-gray-100">
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <h3 className="text-sm font-medium text-green-800">Need assistance?</h3>
              <p className="text-xs text-green-700 mt-1">Our AI assistant can help you find the perfect car.</p>
              <button
                className="mt-3 text-xs bg-green-600 text-white py-2 px-3 rounded-md w-full hover:bg-green-700"
                onClick={() => (window.location.href = "/ai-search")}
              >
                Chat with AI
              </button>
            </div>
          </div> */}
        </div>
      </aside>
    </>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  path: string
}

function SidebarItem({ icon, label, path }: SidebarItemProps) {
  const pathName = usePathname()
  // For home route, we need exact match
  const isActive = path === "/" ? pathName === path : pathName?.startsWith(path)

  return (
    <Link
      href={path}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      <span className={`mr-3 ${isActive ? "text-green-600" : "text-gray-500"}`}>{icon}</span>
      {label}
    </Link>
  )
}