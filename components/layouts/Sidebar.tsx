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
        className="fixed top-4 right-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile auth buttons */}
          <div className="md:hidden p-4 border-b border-gray-100">
            <div className="flex space-x-3">
              <Link
                href="/signin"
                className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <UserPlus size={18} />
                <span>Create Account</span>
              </Link>
            </div>
          </div>

          {/* Main navigation area */}
          <div className="flex-grow p-4">
            <nav className="space-y-1.5 mb-6">
              <SidebarItem path="/" icon={<Home size={18}/>} label="Home" />
              <SidebarItem path="/saved-cars" icon={<Heart size={18} />} label="Saved Cars" />
            </nav>
            
            <div className="mb-6">
              <h2 className="mb-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Explore</h2>
              <nav className="space-y-1.5">
                <SidebarItem path="/popular-cars" icon={<TrendingUp size={18}/>} label="Popular" />
                <SidebarItem path="/explore-with-ai" icon={<Bot size={18} />} label="Explore with AI" />
                <SidebarItem path="/search-cars" icon={<Search size={18} />} label="Search Cars" />
                <SidebarItem path="/compare-cars" icon={<GitCompare size={18} />} label="Compare Cars" />
                <SidebarItem path="/finance" icon={<CreditCard size={18} />} label="Financing Options" />
              </nav>
            </div>
          
            <div>
              <h2 className="mb-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Other</h2>
              <nav className="space-y-1.5">
                <SidebarItem path="/help" icon={<HelpCircle size={18} />} label="Help & Support" />
                <SidebarItem path="/preferences" icon={<Settings size={18} />} label="Preferences" />
              </nav>
            </div>
          </div>
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
  const isActive = path === "/" ? pathName === path : pathName?.startsWith(path)

  return (
    <Link
      href={path}
      className={`flex items-center rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all ${
        isActive 
          ? "bg-green-50 text-green-700" 
          : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
      }`}
    >
      <span className={`mr-3 ${isActive ? "text-green-600" : "text-gray-500"}`}>{icon}</span>
      {label}
    </Link>
  )
}