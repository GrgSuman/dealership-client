"use client"

import { Car, Users, Plus, DollarSign, TrendingUp, Package, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface DashboardStats {
  totalVehicles: number
  activeUsers: number
  totalSales: number
  pendingReviews: number
  recentListings: {
    id: string
    name: string
    price: number
    status: string
  }[]
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/")
    }
  }, [session, status, router])

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (!response.ok) throw new Error("Failed to fetch dashboard stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      toast.error("Failed to load dashboard statistics")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    return null
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/add-vehicle">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-100 hover:border-green-200">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-4 bg-green-50 rounded-full">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Add New Vehicle</h3>
                <p className="text-sm text-gray-500">List a new car for sale</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-4 bg-blue-50 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Manage Users</h3>
                <p className="text-sm text-gray-500">View and manage user accounts</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/inventory">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-4 bg-purple-50 rounded-full">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Inventory</h3>
                <p className="text-sm text-gray-500">Manage vehicle listings</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVehicles || 0}</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Active listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeUsers || 0}</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.totalSales?.toLocaleString() || 0}</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Total revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingReviews || 0}</div>
            <p className="text-xs text-gray-500">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Listings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Vehicle Listings</CardTitle>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/inventory")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {stats?.recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                  <div>
                    <h4 className="font-medium text-gray-900">{listing.name}</h4>
                    <p className="text-sm text-gray-500">${listing.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    listing.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {listing.status}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => router.push(`/admin/inventory/${listing.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}