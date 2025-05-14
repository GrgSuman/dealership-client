"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Search,
  CreditCard,
  Heart,
  HelpCircle,
  Settings,
  Menu,
  X,
  LogIn,
  UserPlus,
  TrendingUp,
  Bot,
  Home,
  GitCompare,
  User,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User as UserType } from "next-auth"
import { signOut } from "@/auth"

export default function Sidebar({ user }: { user: UserType }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const path = usePathname()
  const isAdminPath = path?.includes("/admin")

  if (isAdminPath) return null

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-2 right-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
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
          {/* User profile or auth buttons - ONLY SHOW ON MOBILE */}
          {!user && <div className="p-4 border-b border-gray-100 md:hidden">
              <div className="flex space-x-3">
                <Link
                  href="/signin"
                  className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signin"
                  className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </Link>
              </div>
          </div>
          }

          {/* Main navigation area */}
          <div className="flex-grow p-4 overflow-y-auto">
            <nav className="space-y-1.5 mb-6">
              <SidebarItem path="/" icon={<Home size={18} />} label="Home" />
              {/* <SidebarItem path="/saved-cars" icon={<Heart size={18} />} label="Saved Cars" /> */}
              {/* <SidebarItem path="/popular-cars" icon={<TrendingUp size={18} />} label="Popular" />
              <SidebarItem path="/explore-with-ai" icon={<Bot size={18} />} label="Explore with AI" /> */}
              <SidebarItem path="/explore-cars" icon={<Search size={18} />} label="Explore Cars" />
              <SidebarItem path="/compare-cars" icon={<GitCompare size={18} />} label="Compare Cars" />
              <SidebarItem path="/finance" icon={<CreditCard size={18} />} label="Financing Options" />
              <SidebarItem path="/help" icon={<HelpCircle size={18} />} label="Help & Support" />
              <SidebarItem path="/preferences" icon={<Settings size={18} />} label="Preferences" />
            </nav>

            {/* <div className="mb-6">
              <h2 className="mb-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Explore</h2>
              <nav className="space-y-1.5">
                <SidebarItem path="/popular-cars" icon={<TrendingUp size={18} />} label="Popular" />
                <SidebarItem path="/explore-with-ai" icon={<Bot size={18} />} label="Explore with AI" />
                <SidebarItem path="/search-cars" icon={<Search size={18} />} label="Search Cars" />
                <SidebarItem path="/compare-cars" icon={<GitCompare size={18} />} label="Compare Cars" />
                <SidebarItem path="/finance" icon={<CreditCard size={18} />} label="Financing Options" />
              </nav>
            </div> */}
{/* 
            <div>
              <h2 className="mb-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Other</h2>
              <nav className="space-y-1.5">
                <SidebarItem path="/help" icon={<HelpCircle size={18} />} label="Help & Support" />
                <SidebarItem path="/preferences" icon={<Settings size={18} />} label="Preferences" />
              </nav>
            </div> */}
          </div>

          {/* Mobile-only user profile for bottom of sidebar */}
          {user && (
            <div className="md:hidden p-4 mt-auto border-t border-gray-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden border mr-3">
                        <Image
                          src={user.image || "/placeholder.svg?height=32&width=32"}
                          alt={user.name || "Profile"}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/user" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
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
        isActive ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
      }`}
    >
      <span className={`mr-3 ${isActive ? "text-green-600" : "text-gray-500"}`}>{icon}</span>
      {label}
    </Link>
  )
}