"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Car, Search, Calendar, CreditCard, Heart, HelpCircle, Settings, Menu, X, LogIn, UserPlus, TrendingUp, Bot, Home } from "lucide-react"

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-[14px] right-[14px] z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100"
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile auth buttons */}
          <div className="md:hidden p-4 border-b">
            <div className="space-y-2">
              <Link
                href="/signin"
                className="flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-200"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm bg-green-600 text-white hover:bg-green-700"
              >
                <UserPlus size={16} />
                <span>Create Account</span>
              </Link>
            </div>
          </div>

          <div className="p-4">

            <nav className="space-y-1">
                <SidebarItem icon={<Home size={16}/>} label="Home" active/>
                <SidebarItem icon={<Heart size={16} />} label="Saved Cars" />
            </nav>

            <h2 className="my-3 text-sm font-medium text-gray-500 tracking-wider">Explore</h2>
            <nav className="space-y-1">
              <SidebarItem icon={<TrendingUp size={16}/>} label="Trending" />
              <SidebarItem icon={<Bot  size={16} />} label="Explore with AI" />
              <SidebarItem icon={<Search size={16} />} label="Search Inventory" />
              <SidebarItem icon={<Calendar size={16} />} label="Book Test Drive" />
              <SidebarItem icon={<CreditCard size={16} />} label="Financing Options" />
            </nav>
          </div>

          <div className="p-4">
            <h2 className="mb-3 text-sm font-medium text-gray-500 tracking-wider">Other</h2>
            <nav className="space-y-1">
              <SidebarItem icon={<HelpCircle size={16} />} label="Help & Support" />
              <SidebarItem icon={<Settings size={16} />} label="Preferences" />
            </nav>
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
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  return (
    <a
      href="#"
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
        active
          ? "bg-green-50 text-green-700"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className={`mr-3 ${active ? "text-green-600" : "text-gray-500"}`}>{icon}</span>
      {label}
    </a>
  )
}

