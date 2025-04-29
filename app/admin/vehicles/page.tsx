"use client"

import { useState } from "react"
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
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

// Types based on your schema
interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  bodyType: string
  transmission: string
  fuelType: string
  odometer: number
  color: string
  stockNumber: string
  createdAt: Date
}

export default function VehiclesPage() {
  const [filterOpen, setFilterOpen] = useState(false)

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
          <Select defaultValue="createdAt">
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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="audi">Audi</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Body Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
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
              <TableHead>Added Date</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-sm text-gray-500">
                      {vehicle.color}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{vehicle.stockNumber}</TableCell>
                <TableCell>${vehicle.price.toLocaleString()}</TableCell>
                <TableCell>{vehicle.odometer.toLocaleString()} km</TableCell>
                <TableCell>{vehicle.bodyType}</TableCell>
                <TableCell>{vehicle.transmission}</TableCell>
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
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Sample data
const sampleVehicles: Vehicle[] = [
  {
    id: "1",
    make: "Audi",
    model: "A4",
    year: 2023,
    price: 55000,
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Petrol",
    odometer: 15000,
    color: "Brilliant Black",
    stockNumber: "A123",
    createdAt: new Date("2024-01-15"),
  },
  // Add more sample vehicles...
]