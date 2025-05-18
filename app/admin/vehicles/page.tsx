"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getVehicles, deleteVehicle } from "@/app/actions/vehicle/vehicle"
import { Vehicle, BodyType, Transmission, FuelType } from "@prisma/client"
import Image from "next/image"

export default function VehiclesPage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [filters, setFilters] = useState({
    make: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
  })

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const result = await getVehicles()
      if (result.success && result.data) {
        setVehicles(result.data)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Failed to load vehicles")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return

    try {
      const result = await deleteVehicle(id)
      if (result.success) {
        toast.success("Vehicle deleted successfully")
        loadVehicles()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Failed to delete vehicle")
    }
  }

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.stockNumber?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilters = 
      (!filters.make || vehicle.make === filters.make) &&
      (!filters.bodyType || vehicle.bodyType === filters.bodyType) &&
      (!filters.fuelType || vehicle.fuelType === filters.fuelType) &&
      (!filters.transmission || vehicle.transmission === filters.transmission)

    return matchesSearch && matchesFilters
  })

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return b.price - a.price
      case "year":
        return b.year - a.year
      case "make":
        return a.make.localeCompare(b.make)
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const uniqueMakes = Array.from(new Set(vehicles.map(v => v.make)))

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Management</h1>
          <p className="text-gray-500">Manage your vehicle inventory</p>
        </div>
        <Link href="/admin/vehicles/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </Link>
      </div>

      {/* Filters and Search Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search vehicles..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Added</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="make">Make</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border">
          <Select
            value={filters.make}
            onValueChange={(value) => setFilters(prev => ({ ...prev, make: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Makes</SelectItem>
              {uniqueMakes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.bodyType}
            onValueChange={(value) => setFilters(prev => ({ ...prev, bodyType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Body Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Body Types</SelectItem>
              {Object.values(BodyType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.fuelType}
            onValueChange={(value) => setFilters(prev => ({ ...prev, fuelType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Fuel Types</SelectItem>
              {Object.values(FuelType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.transmission}
            onValueChange={(value) => setFilters(prev => ({ ...prev, transmission: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Transmissions</SelectItem>
              {Object.values(Transmission).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Stock #</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Odometer</TableHead>
              <TableHead>Body Type</TableHead>
              <TableHead>Transmission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Loading vehicles...
                </TableCell>
              </TableRow>
            ) : sortedVehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No vehicles found
                </TableCell>
              </TableRow>
            ) : (
              sortedVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      {vehicle.images[0] && (
                        <div className="relative w-16 h-16">
                          <Image
                            src={vehicle.images[0]}
                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.color}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.stockNumber}</TableCell>
                  <TableCell>${vehicle.price.toLocaleString()}</TableCell>
                  <TableCell>{vehicle.odometer.toLocaleString()} km</TableCell>
                  <TableCell>{vehicle.bodyType}</TableCell>
                  <TableCell>{vehicle.transmission}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      vehicle.status === 'AVAILABLE' 
                        ? 'bg-green-100 text-green-700' 
                        : vehicle.status === 'SOLD'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {vehicle.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(vehicle.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => router.push(`/admin/vehicles/${vehicle.id}/edit`)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}