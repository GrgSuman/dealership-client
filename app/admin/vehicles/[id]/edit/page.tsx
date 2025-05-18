"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { toast } from "sonner"
import { updateVehicle, getVehicleById } from "@/app/actions/vehicle/vehicle"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X } from "lucide-react"
import { BodyType, Transmission, FuelType, VehicleCondition, VehicleStatus, Vehicle } from "@prisma/client"

const bodyTypes = Object.values(BodyType)
const transmissionTypes = Object.values(Transmission)
const fuelTypes = Object.values(FuelType)
const conditions = Object.values(VehicleCondition)
const statuses = Object.values(VehicleStatus)

export default function EditVehicle({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    bodyType: BodyType.SEDAN,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.PETROL,
    fuelConsumptionUrban: null,
    fuelConsumptionExtraUrban: null,
    fuelConsumptionCombined: null,
    engineCapacity: null,
    cylinders: null,
    odometer: 0,
    driveType: '',
    doors: null,
    seats: null,
    color: '',
    rego: '',
    vin: '',
    stockNumber: '',
    description: '',
    images: [],
    status: VehicleStatus.AVAILABLE,
    condition: VehicleCondition.USED,
    features: []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadingImages, setUploadingImages] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  useEffect(() => {
    loadVehicle()
  }, [params.id])

  const loadVehicle = async () => {
    try {
      const result = await getVehicleById(params.id)
      if (result.success && result.data) {
        setFormData(result.data)
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

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    setUploadingImages(true)
    try {
      const uploadPromises = Array.from(e.target.files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Upload failed")
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls]
      }))
    } catch (error) {
      toast.error("Failed to upload images")
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.make) newErrors.make = "Make is required"
    if (!formData.model) newErrors.model = "Model is required"
    if (!formData.price) newErrors.price = "Price is required"
    if (!formData.bodyType) newErrors.bodyType = "Body type is required"
    if (!formData.transmission) newErrors.transmission = "Transmission is required"
    if (!formData.fuelType) newErrors.fuelType = "Fuel type is required"
    if (!formData.odometer) newErrors.odometer = "Odometer is required"
    if (!formData.images?.length) newErrors.images = "At least one image is required"
    if (!formData.description) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      const result = await updateVehicle(params.id, {
        ...formData,
        price: Number(formData.price),
        year: Number(formData.year),
        odometer: Number(formData.odometer),
        engineCapacity: formData.engineCapacity ? Number(formData.engineCapacity) : null,
        cylinders: formData.cylinders ? Number(formData.cylinders) : null,
        doors: formData.doors ? Number(formData.doors) : null,
        seats: formData.seats ? Number(formData.seats) : null,
        fuelConsumptionUrban: formData.fuelConsumptionUrban ? Number(formData.fuelConsumptionUrban) : null,
        fuelConsumptionExtraUrban: formData.fuelConsumptionExtraUrban ? Number(formData.fuelConsumptionExtraUrban) : null,
        fuelConsumptionCombined: formData.fuelConsumptionCombined ? Number(formData.fuelConsumptionCombined) : null,
      })

      if (result.success) {
        toast.success("Vehicle updated successfully!")
        router.push("/admin/vehicles")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Failed to update vehicle")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Loading vehicle data...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Vehicle</h1>
        <p className="text-muted-foreground mt-2">
          Update the vehicle details below. Required fields are marked with an asterisk (*).
        </p>
      </div>

      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Images</CardTitle>
          <CardDescription>Upload images of the vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Vehicle image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                />
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    {uploadingImages ? "Uploading..." : "Click to upload"}
                  </p>
                </div>
              </label>
            </div>
            {errors.images && (
              <p className="text-sm text-red-500">{errors.images}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the main details of the vehicle</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Make <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., Audi"
                value={formData.make}
                onChange={(e) => handleChange('make', e.target.value)}
                className={errors.make ? 'border-red-500' : ''}
              />
              {errors.make && (
                <p className="text-sm text-red-500">{errors.make}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Model <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., A4"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                className={errors.model ? 'border-red-500' : ''}
              />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Body Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.bodyType}
                onValueChange={(value) => handleChange('bodyType', value)}
              >
                <SelectTrigger className={errors.bodyType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bodyType && (
                <p className="text-sm text-red-500">{errors.bodyType}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Condition <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.condition}
                onValueChange={(value) => handleChange('condition', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Details</CardTitle>
          <CardDescription>Enter the vehicle's technical specifications</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Transmission <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.transmission}
                onValueChange={(value) => handleChange('transmission', value)}
              >
                <SelectTrigger className={errors.transmission ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  {transmissionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.transmission && (
                <p className="text-sm text-red-500">{errors.transmission}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Fuel Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => handleChange('fuelType', value)}
              >
                <SelectTrigger className={errors.fuelType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fuelType && (
                <p className="text-sm text-red-500">{errors.fuelType}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Odometer (km) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                placeholder="Enter odometer reading"
                value={formData.odometer}
                onChange={(e) => handleChange('odometer', e.target.value)}
                className={errors.odometer ? 'border-red-500' : ''}
              />
              {errors.odometer && (
                <p className="text-sm text-red-500">{errors.odometer}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Engine Capacity (L)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="Enter engine capacity"
                value={formData.engineCapacity || ''}
                onChange={(e) => handleChange('engineCapacity', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cylinders</label>
              <Input
                type="number"
                placeholder="Enter number of cylinders"
                value={formData.cylinders || ''}
                onChange={(e) => handleChange('cylinders', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Drive Type</label>
              <Input
                placeholder="e.g., AWD, FWD, RWD"
                value={formData.driveType || ''}
                onChange={(e) => handleChange('driveType', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Doors</label>
              <Input
                type="number"
                placeholder="Enter number of doors"
                value={formData.doors || ''}
                onChange={(e) => handleChange('doors', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Seats</label>
              <Input
                type="number"
                placeholder="Enter number of seats"
                value={formData.seats || ''}
                onChange={(e) => handleChange('seats', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <Input
                placeholder="Enter vehicle color"
                value={formData.color || ''}
                onChange={(e) => handleChange('color', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel Consumption (Urban)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="L/100km"
                value={formData.fuelConsumptionUrban || ''}
                onChange={(e) => handleChange('fuelConsumptionUrban', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel Consumption (Extra Urban)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="L/100km"
                value={formData.fuelConsumptionExtraUrban || ''}
                onChange={(e) => handleChange('fuelConsumptionExtraUrban', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel Consumption (Combined)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="L/100km"
                value={formData.fuelConsumptionCombined || ''}
                onChange={(e) => handleChange('fuelConsumptionCombined', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
          <CardDescription>Enter additional vehicle information</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Registration Number</label>
              <Input
                placeholder="Enter registration number"
                value={formData.rego || ''}
                onChange={(e) => handleChange('rego', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">VIN</label>
              <Input
                placeholder="Enter VIN"
                value={formData.vin || ''}
                onChange={(e) => handleChange('vin', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Number</label>
              <Input
                placeholder="Enter stock number"
                value={formData.stockNumber || ''}
                onChange={(e) => handleChange('stockNumber', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Enter vehicle description"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Features</label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddFeature()
                  }
                }}
              />
              <Button onClick={handleAddFeature}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                >
                  <span>{feature}</span>
                  <button
                    onClick={() => handleRemoveFeature(index)}
                    className="text-gray-500 hover:text-red-500"
                    title="Remove feature"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/vehicles")}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
} 