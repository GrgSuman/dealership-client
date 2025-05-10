"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"

// Define enum values
const bodyTypes = ["SEDAN", "SUV", "HATCHBACK", "WAGON", "UTE", "VAN", "COUPE", "CONVERTIBLE"]
const transmissionTypes = ["MANUAL", "AUTOMATIC", "CVT", "DCT"]
const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "PLUGIN_HYBRID"]

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

export default function AddVehiclePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    bodyType: "",
    transmission: "",
    fuelType: "",
    odometer: "",
    color: "",
    stockNumber: "",
    description: "",
    features: "",
    images: [] as File[]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First, upload images and get their URLs
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          // Validate file size
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File ${file.name} is too large. Maximum size is 5MB.`)
          }

          // Validate file type
          if (!file.type.startsWith("image/")) {
            throw new Error(`File ${file.name} is not an image.`)
          }

          const formData = new FormData()
          formData.append("file", file)

          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            })

            if (!response.ok) {
              const error = await response.json()
              throw new Error(error.error || error.details || "Failed to upload image")
            }

            const data = await response.json()
            return data.url
          } catch (error) {
            console.error(`Error uploading ${file.name}:`, error)
            throw new Error(`Failed to upload ${file.name}: ${error instanceof Error ? error.message : "Unknown error"}`)
          }
        })
      )

      // Then create the vehicle with image URLs
      const response = await fetch("/api/admin/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
          price: parseFloat(formData.price),
          odometer: parseInt(formData.odometer),
          images: imageUrls,
          status: "AVAILABLE",
          condition: "USED",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to add vehicle")
      }

      toast.success("Vehicle added successfully")
      router.push("/admin/vehicles")
    } catch (error) {
      console.error("Error adding vehicle:", error)
      toast.error(error instanceof Error ? error.message : "Failed to add vehicle")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    // Validate files
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} is too large. Maximum size is 5MB.`)
        return
      }
      if (!file.type.startsWith("image/")) {
        toast.error(`File ${file.name} is not an image.`)
        return
      }
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Vehicle</h1>
        <p className="text-gray-500">Enter the details of the new vehicle</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Vehicle Images</label>
            <div className="mt-2 flex flex-wrap gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Make</label>
            <Input
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="e.g., Toyota"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Model</label>
            <Input
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g., Camry"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <Input
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g., 2023"
              min="1900"
              max={new Date().getFullYear() + 1}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 25000"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Body Type</label>
            <Select
              value={formData.bodyType}
              onValueChange={(value: string) => handleSelect("bodyType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Transmission</label>
            <Select
              value={formData.transmission}
              onValueChange={(value: string) => handleSelect("transmission", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                {transmissionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fuel Type</label>
            <Select
              value={formData.fuelType}
              onValueChange={(value: string) => handleSelect("fuelType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Odometer (km)</label>
            <Input
              name="odometer"
              type="number"
              value={formData.odometer}
              onChange={handleChange}
              placeholder="e.g., 50000"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <Input
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Silver"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stock Number</label>
            <Input
              name="stockNumber"
              value={formData.stockNumber}
              onChange={handleChange}
              placeholder="e.g., STK123"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter vehicle description..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Features</label>
          <Textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Enter vehicle features (one per line)..."
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Vehicle"}
          </Button>
        </div>
      </form>
    </div>
  )
}