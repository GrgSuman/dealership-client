"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { BodyType, Transmission, FuelType, VehicleStatus, VehicleCondition, formatEnum } from "@/lib/enums"
import Image from "next/image"

interface Vehicle {
    id: string
    make: string
    model: string
    year: number
    price: number
    mileage: number
    color: string
    vin: string
    description: string
    bodyType: BodyType
    transmission: Transmission
    fuelType: FuelType
    status: VehicleStatus
    condition: VehicleCondition
    images: string[]
}

export default function VehicleFormPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)
    const [images, setImages] = useState<string[]>([])
    const router = useRouter()
    const params = useParams()
    const isEditMode = params?.id !== undefined

    useEffect(() => {
        if (isEditMode) {
            const fetchVehicle = async () => {
                try {
                    const response = await fetch(`/api/admin/vehicles/${params.id}`)
                    if (!response.ok) {
                        throw new Error("Failed to fetch vehicle")
                    }
                    const data = await response.json()
                    setVehicle(data)
                    setImages(data.images || [])
                } catch (error) {
                    console.error("Error fetching vehicle:", error)
                    toast.error("Failed to fetch vehicle details")
                    router.push("/admin/vehicles")
                }
            }

            fetchVehicle()
        }
    }, [isEditMode, params.id, router])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        setIsLoading(true)
        try {
            const formData = new FormData()
            Array.from(files).forEach((file) => {
                formData.append("images", file)
            })

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to upload images")
            }

            const data = await response.json()
            setImages((prev) => [...prev, ...data.urls])
            toast.success("Images uploaded successfully")
        } catch (error) {
            console.error("Error uploading images:", error)
            toast.error("Failed to upload images")
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            make: formData.get("make"),
            model: formData.get("model"),
            year: parseInt(formData.get("year") as string),
            price: parseInt(formData.get("price") as string) * 100, // Convert to cents
            mileage: parseInt(formData.get("mileage") as string),
            color: formData.get("color"),
            vin: formData.get("vin"),
            description: formData.get("description"),
            bodyType: formData.get("bodyType"),
            transmission: formData.get("transmission"),
            fuelType: formData.get("fuelType"),
            status: formData.get("status"),
            condition: formData.get("condition"),
            images,
        }

        try {
            const url = isEditMode ? `/api/admin/vehicles/${params.id}` : "/api/admin/vehicles"
            const method = isEditMode ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || (isEditMode ? "Failed to update vehicle" : "Failed to create vehicle"))
            }

            toast.success(isEditMode ? "Vehicle updated successfully" : "Vehicle created successfully")
            router.push("/admin/vehicles")
        } catch (error) {
            console.error("Error:", error)
            toast.error(error instanceof Error ? error.message : (isEditMode ? "Failed to update vehicle" : "Failed to create vehicle"))
        } finally {
            setIsLoading(false)
        }
    }

    if (isEditMode && !vehicle) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">{isEditMode ? "Edit Vehicle" : "Add New Vehicle"}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="make">Make</Label>
                            <Input
                                id="make"
                                name="make"
                                defaultValue={vehicle?.make}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="model">Model</Label>
                            <Input
                                id="model"
                                name="model"
                                defaultValue={vehicle?.model}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Input
                                id="year"
                                name="year"
                                type="number"
                                min="1900"
                                max={new Date().getFullYear() + 1}
                                defaultValue={vehicle?.year}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                defaultValue={vehicle ? vehicle.price / 100 : undefined}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="mileage">Mileage</Label>
                            <Input
                                id="mileage"
                                name="mileage"
                                type="number"
                                min="0"
                                defaultValue={vehicle?.mileage}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="color">Color</Label>
                            <Input
                                id="color"
                                name="color"
                                defaultValue={vehicle?.color}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="vin">VIN</Label>
                        <Input
                            id="vin"
                            name="vin"
                            defaultValue={vehicle?.vin}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={vehicle?.description}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bodyType">Body Type</Label>
                            <Select name="bodyType" defaultValue={vehicle?.bodyType} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select body type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(BodyType).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {formatEnum(type)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="transmission">Transmission</Label>
                            <Select name="transmission" defaultValue={vehicle?.transmission} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select transmission" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(Transmission).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {formatEnum(type)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fuelType">Fuel Type</Label>
                            <Select name="fuelType" defaultValue={vehicle?.fuelType} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select fuel type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(FuelType).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {formatEnum(type)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" defaultValue={vehicle?.status} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(VehicleStatus).map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {formatEnum(status)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select name="condition" defaultValue={vehicle?.condition} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(VehicleCondition).map((condition) => (
                                    <SelectItem key={condition} value={condition}>
                                        {formatEnum(condition)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label>Images</Label>
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={image}
                                        alt={`Vehicle image ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        title="Remove image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <label className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="mt-2 block text-sm text-gray-500">Add Images</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/vehicles")}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Vehicle")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
} 