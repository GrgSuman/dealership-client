"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import Image from "next/image"
import { User as UserType } from "next-auth"
import { signOutUser } from "@/app/actions/auth/userAuth"

const ClientHeader = ({ user }: { user: UserType }) => {
  const path = usePathname()
  const isAdminPath = path?.includes("/admin")

  if (isAdminPath) return null

  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-background border-b py-3 px-4">
      <header className="flex justify-between items-center mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative">
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
                <span className="text-foreground">The</span>
                <span className="text-green-600">Final</span>
                <span className="text-foreground">Group</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Auth buttons or User Profile */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 px-3 gap-2 hover:bg-muted">
                  <span className="font-medium text-sm hidden sm:inline-block">{user?.name}</span>
                  <div className="h-8 w-8 rounded-full overflow-hidden border">
                    <Image
                      src={user.image || "/placeholder.svg"}
                      alt={user.name || "Profile"}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/user" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => await signOutUser()}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/signin">Create Account</Link>
              </Button>
            </>
          )}
        </div>
      </header>
    </div>
  )
}

export default ClientHeader
