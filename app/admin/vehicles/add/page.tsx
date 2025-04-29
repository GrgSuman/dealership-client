"use client"

import { useState } from 'react'
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

const bodyTypes = [
  'Hatchback', 'Sedan', 'SUV', 'Coupe', 'Wagon', 
  'Convertible', 'Ute', 'Van', 'Truck', 'Other'
]

const transmissionTypes = [
  'Manual', 'Automatic', 'Sports Automatic Dual Clutch', 
  'CVT', 'Semi-Automatic', 'Other'
]

const fuelTypes = [
  'Petrol', 'Diesel', 'Hybrid', 'Electric', 
  'LPG', 'Hydrogen', 'Other'
]

const driveTypes = ['FWD', 'RWD', 'AWD', '4WD', 'Other']

export default function AddVehicle() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    bodyType: '',
    transmission: '',
    fuelType: '',
    engineCapacity: '',
    cylinders: '',
    odometer: '',
    driveType: '',
    doors: '',
    seats: '',
    color: '',
    rego: '',
    vin: '',
    stockNumber: '',
    description: '',
    images: [] as string[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...fileArray]
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Vehicle added successfully!")
      // Reset form
      setFormData({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        bodyType: '',
        transmission: '',
        fuelType: '',
        engineCapacity: '',
        cylinders: '',
        odometer: '',
        driveType: '',
        doors: '',
        seats: '',
        color: '',
        rego: '',
        vin: '',
        stockNumber: '',
        description: '',
        images: []
      })
      setErrors({})
    } catch (error) {
      toast.error("Failed to add vehicle")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Vehicle</h1>
        <p className="text-muted-foreground mt-2">
          Enter the vehicle details below. Required fields are marked with an asterisk (*).
        </p>
      </div>

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
          </div>
        </CardContent>
      </Card>

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

            {/* Add other technical fields similarly */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images & Description</CardTitle>
          <CardDescription>Add vehicle images and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium">Vehicle Images</label>
            <Input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="cursor-pointer"
            />
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Vehicle ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full 
                               opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Enter vehicle description..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setFormData({
              make: '',
              model: '',
              year: new Date().getFullYear(),
              price: '',
              bodyType: '',
              transmission: '',
              fuelType: '',
              engineCapacity: '',
              cylinders: '',
              odometer: '',
              driveType: '',
              doors: '',
              seats: '',
              color: '',
              rego: '',
              vin: '',
              stockNumber: '',
              description: '',
              images: []
            })
            setErrors({})
          }}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Vehicle'}
        </Button>
      </div>
    </div>
  )
}