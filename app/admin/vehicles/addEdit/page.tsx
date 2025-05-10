"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BodyType, Transmission, FuelType, VehicleStatus, VehicleCondition } from "@prisma/client"
import { X, Upload } from "lucide-react"
import Image from "next/image"

interface VehicleFormData {
    make: string
    model: string
    year: number
    price: number | ""
    bodyType: BodyType
    transmission: Transmission
    fuelType: FuelType
    odometer: number | ""
    status: VehicleStatus
    condition: VehicleCondition
    description: string
    color: string
    vin: string
    features: string[]
    images: string[]
}

const initialFormData: VehicleFormData = {
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    bodyType: BodyType.SEDAN,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.PETROL,
    odometer: "",
    status: VehicleStatus.AVAILABLE,
    condition: VehicleCondition.NEW,
    description: "",
    color: "",
    vin: "",
    features: [],
    images: [],
}

export default function AddEditVehiclePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const vehicleId = searchParams.get("id")
    const [formData, setFormData] = useState<VehicleFormData>(initialFormData)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (vehicleId) {
            fetchVehicleData()
        }
    }, [vehicleId])

    const fetchVehicleData = async () => {
        try {
            const response = await fetch(`/api/admin/vehicles/${vehicleId}`)
            if (!response.ok) {
                throw new Error("Failed to fetch vehicle data")
            }
            const data = await response.json()
            setFormData(data)
        } catch (error) {
            console.error("Error fetching vehicle data:", error)
            toast.error("Failed to fetch vehicle data")
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "year" || name === "price" || name === "odometer"
                ? Number(value)
                : value,
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Validate price and odometer
            if (formData.price === "" || formData.odometer === "") {
                toast.error("Please enter both price and odometer values")
                setIsLoading(false)
                return
            }

            const price = Number(formData.price)
            const odometer = Number(formData.odometer)

            if (isNaN(price) || price <= 0) {
                toast.error("Please enter a valid price")
                setIsLoading(false)
                return
            }

            if (isNaN(odometer) || odometer < 0) {
                toast.error("Please enter a valid odometer reading")
                setIsLoading(false)
                return
            }

            const method = vehicleId ? "PATCH" : "POST"
            const url = vehicleId
                ? `/api/admin/vehicles/${vehicleId}`
                : "/api/admin/vehicles"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price,
                    odometer,
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save vehicle")
            }

            toast.success(
                vehicleId ? "Vehicle updated successfully" : "Vehicle added successfully"
            )
            router.push("/admin/vehicles")
        } catch (error) {
            console.error("Error saving vehicle:", error)
            toast.error("Failed to save vehicle")
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            Array.from(files).forEach((file) => {
                formData.append("images", file)
            })

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to upload images")
            }

            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...data.urls],
            }))
            toast.success("Images uploaded successfully")
        } catch (error) {
            console.error("Error uploading images:", error)
            toast.error(error instanceof Error ? error.message : "Failed to upload images")
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>{vehicleId ? "Edit Vehicle" : "Add New Vehicle"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="make">Make</Label>
                                <Input
                                    id="make"
                                    name="make"
                                    value={formData.make}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="model">Model</Label>
                                <Input
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    name="year"
                                    type="number"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bodyType">Body Type</Label>
                                <Select
                                    value={formData.bodyType}
                                    onValueChange={(value) => handleSelectChange("bodyType", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select body type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(BodyType).map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type.replace("_", " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="transmission">Transmission</Label>
                                <Select
                                    value={formData.transmission}
                                    onValueChange={(value) =>
                                        handleSelectChange("transmission", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select transmission" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Transmission).map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type.replace("_", " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fuelType">Fuel Type</Label>
                                <Select
                                    value={formData.fuelType}
                                    onValueChange={(value) => handleSelectChange("fuelType", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select fuel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(FuelType).map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type.replace("_", " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="odometer">Odometer (km)</Label>
                                <Input
                                    id="odometer"
                                    name="odometer"
                                    type="number"
                                    min="0"
                                    value={formData.odometer}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="condition">Condition</Label>
                                <Select
                                    value={formData.condition}
                                    onValueChange={(value) => handleSelectChange("condition", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(VehicleCondition).map((condition) => (
                                            <SelectItem key={condition} value={condition}>
                                                {condition.replace("_", " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => handleSelectChange("status", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(VehicleStatus).map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status.replace("_", " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="color">Color</Label>
                                <Input
                                    id="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vin">VIN</Label>
                                <Input
                                    id="vin"
                                    name="vin"
                                    value={formData.vin}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="features">Features (comma-separated)</Label>
                            <Textarea
                                id="features"
                                name="features"
                                value={formData.features.join(", ")}
                                onChange={(e) => {
                                    const features = e.target.value
                                        .split(",")
                                        .map(feature => feature.trim())
                                        .filter(feature => feature.length > 0);
                                    setFormData(prev => ({
                                        ...prev,
                                        features
                                    }));
                                }}
                                placeholder="Enter features separated by commas (e.g., Leather seats, Sunroof, Navigation)"
                                rows={3}
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div className="space-y-2">
                            <Label htmlFor="images">Images</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-square relative rounded-lg overflow-hidden border">
                                            <Image
                                                src={image}
                                                alt={`Vehicle image ${index + 1}`}
                                                width={300}
                                                height={300}
                                                className="object-cover w-full h-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove image"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <label
                                    htmlFor="image-upload"
                                    className="aspect-square relative rounded-lg overflow-hidden border border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
                                >
                                    <input
                                        id="image-upload"
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        multiple
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        disabled={isUploading}
                                        aria-label="Upload vehicle images"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                        {isUploading ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                                <span className="text-sm text-gray-500">Uploading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-500">
                                                    Click to upload images
                                                </span>
                                            </>
                                        )}
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
                            <Button type="submit" disabled={isLoading || isUploading}>
                                {isLoading ? "Saving..." : vehicleId ? "Update Vehicle" : "Add Vehicle"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
} 