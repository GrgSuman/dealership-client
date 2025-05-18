"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { deleteVehicle, getVehicleById } from "@/app/actions/vehicle/vehicle"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function DeleteVehicle({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVehicle()
  }, [params.id])

  const loadVehicle = async () => {
    try {
      const result = await getVehicleById(params.id)
      if (result.success && result.data) {
        setVehicle(result.data)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Failed to load vehicle")
      router.push("/admin/vehicles")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteVehicle(params.id)
      if (result.success) {
        toast.success("Vehicle deleted successfully")
        router.push("/admin/vehicles")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Failed to delete vehicle")
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Loading vehicle data...</div>
      </div>
    )
  }

  if (!vehicle) {
    return null
  }

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Delete Vehicle</CardTitle>
          <CardDescription>
            Are you sure you want to delete this vehicle? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vehicle.images?.[0] && (
              <div className="relative aspect-video w-full">
                <Image
                  src={vehicle.images[0]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </h3>
              <p className="text-sm text-muted-foreground">
                Stock Number: {vehicle.stockNumber || 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">
                Price: ${vehicle.price.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/vehicles")}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Vehicle"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 