"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Car, Fuel, Building2, Sparkles, MapPin, Star, Save, Check } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Predefined options
const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Coupe", "Convertible", "Wagon", "Van", "Pickup"]
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"]
const BRANDS = ["Toyota", "Honda", "Tesla", "BMW", "Mercedes", "Audi", "Ford", "Hyundai", "Kia", "Nissan"]
const FEATURES = [
  "Sunroof",
  "4WD",
  "Navigation",
  "Leather Seats",
  "Parking Sensors",
  "Bluetooth",
  "Apple CarPlay",
  "Android Auto",
  "Heated Seats",
  "Backup Camera",
]
const PRIMARY_USES = [
  "Family trips",
  "Daily commute",
  "Off-road",
  "City driving",
  "Long distance",
  "Business",
  "Weekend trips",
]
const PRIORITIES = [
  "Fuel efficiency",
  "Safety",
  "Performance",
  "Comfort",
  "Technology",
  "Space",
  "Style",
  "Reliability",
]

type PreferenceCategory = 'carTypes' | 'fuelTypes' | 'brand' | 'features' | 'primarilyUse' | 'topPriorities'

interface Preferences {
  budgetMin: number
  budgetMax: number
  carTypes: string[]
  fuelTypes: string[]
  brand: string[]
  features: string[]
  primarilyUse: string[]
  topPriorities: string[]
}

export default function Preferences() {
  const [preferences, setPreferences] = useState<Preferences>({
    budgetMin: 20000,
    budgetMax: 80000,
    carTypes: ["Van"],
    fuelTypes: [],
    brand: [],
    features: [],
    primarilyUse: [],
    topPriorities: [],
  })

  const [isSaved, setIsSaved] = useState(false)

  const toggleOption = (category: PreferenceCategory, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item: string) => item !== value)
        : [...prev[category], value],
    }))
  }

  const handleSavePreferences = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-40 border-b border-gray-200 -mx-4 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tight mb-2">
              <span className="text-foreground">Your</span>
              <span className="text-gray-900"> Car</span>
              <span className="text-foreground"> Preferences</span>
            </h1>
            <p className="text-gray-500 text-base">Select your preferences to get personalized car recommendations</p>
          </div>
          <Button 
            onClick={handleSavePreferences}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            {isSaved ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Saved</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Set My Preferences</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-4">
          {/* Budget */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Save className="h-5 w-5 text-gray-600" />
              <span className="text-base">Budget Range</span>
            </div>
            <div className="space-y-4">
              <Slider
                defaultValue={[preferences.budgetMin, preferences.budgetMax]}
                max={200000}
                step={1000}
                onValueChange={([min, max]) =>
                  setPreferences((prev) => ({ ...prev, budgetMin: min, budgetMax: max }))
                }
              />
              <div className="flex justify-between">
                <div className="bg-gray-50 px-4 py-2 rounded-md">
                  <span className="text-sm text-gray-500">Min</span>
                  <p className="text-base">${preferences.budgetMin.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-md">
                  <span className="text-sm text-gray-500">Max</span>
                  <p className="text-base">${preferences.budgetMax.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Car Types */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-gray-600" />
                <span className="text-base">Car Types</span>
              </div>
              {preferences.carTypes.length > 0 && (
                <Badge variant="secondary" className="text-sm bg-gray-50">
                  {preferences.carTypes.length} selected
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {CAR_TYPES.map((type) => (
                <motion.div key={type} whileTap={{ scale: 0.98 }}>
                  <Badge
                    variant={preferences.carTypes.includes(type) ? "default" : "outline"}
                    className={`cursor-pointer text-sm px-3 py-1.5 ${
                      preferences.carTypes.includes(type) 
                        ? "bg-gray-900 hover:bg-gray-800 text-white" 
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOption("carTypes", type)}
                  >
                    {preferences.carTypes.includes(type) && <Check className="mr-1.5 h-4 w-4" />}
                    {type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fuel Types */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-gray-600" />
                <span className="text-base">Fuel Types</span>
              </div>
              {preferences.fuelTypes.length > 0 && (
                <Badge variant="secondary" className="text-sm bg-gray-50">
                  {preferences.fuelTypes.length} selected
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {FUEL_TYPES.map((type) => (
                <motion.div key={type} whileTap={{ scale: 0.98 }}>
                  <Badge
                    variant={preferences.fuelTypes.includes(type) ? "default" : "outline"}
                    className={`cursor-pointer text-sm px-3 py-1.5 ${
                      preferences.fuelTypes.includes(type) 
                        ? "bg-gray-900 hover:bg-gray-800 text-white" 
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOption("fuelTypes", type)}
                  >
                    {preferences.fuelTypes.includes(type) && <Check className="mr-1.5 h-4 w-4" />}
                    {type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-600" />
                <span className="text-base">Preferred Brands</span>
              </div>
              {preferences.brand.length > 0 && (
                <Badge variant="secondary" className="text-sm bg-gray-50">
                  {preferences.brand.length} selected
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <motion.div key={brand} whileTap={{ scale: 0.98 }}>
                  <Badge
                    variant={preferences.brand.includes(brand) ? "default" : "outline"}
                    className={`cursor-pointer text-sm px-3 py-1.5 ${
                      preferences.brand.includes(brand) 
                        ? "bg-gray-900 hover:bg-gray-800 text-white" 
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOption("brand", brand)}
                  >
                    {preferences.brand.includes(brand) && <Check className="mr-1.5 h-4 w-4" />}
                    {brand}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gray-600" />
                <span className="text-base">Desired Features</span>
              </div>
              {preferences.features.length > 0 && (
                <Badge variant="secondary" className="text-sm bg-gray-50">
                  {preferences.features.length} selected
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map((feature) => (
                <motion.div key={feature} whileTap={{ scale: 0.98 }}>
                  <Badge
                    variant={preferences.features.includes(feature) ? "default" : "outline"}
                    className={`cursor-pointer text-sm px-3 py-1.5 ${
                      preferences.features.includes(feature) 
                        ? "bg-gray-900 hover:bg-gray-800 text-white" 
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOption("features", feature)}
                  >
                    {preferences.features.includes(feature) && <Check className="mr-1.5 h-4 w-4" />}
                    {feature}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Primary Use */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="text-base">Primary Use</span>
              </div>
              {preferences.primarilyUse.length > 0 && (
                <Badge variant="secondary" className="text-sm bg-gray-50">
                  {preferences.primarilyUse.length} selected
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {PRIMARY_USES.map((use) => (
                <motion.div key={use} whileTap={{ scale: 0.98 }}>
                  <Badge
                    variant={preferences.primarilyUse.includes(use) ? "default" : "outline"}
                    className={`cursor-pointer text-sm px-3 py-1.5 ${
                      preferences.primarilyUse.includes(use) 
                        ? "bg-gray-900 hover:bg-gray-800 text-white" 
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOption("primarilyUse", use)}
                  >
                    {preferences.primarilyUse.includes(use) && <Check className="mr-1.5 h-4 w-4" />}
                    {use}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Priorities */}
          <div className="p-5 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-gray-600" />
                <span className="text-base">Top Priorities</span>
              </div>
              {preferences.topPriorities.length > 0 && (
                <Badge variant="secondary" className="text-sm bg-gray-50">
                  {preferences.topPriorities.length} selected
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {PRIORITIES.map((priority) => (
                <motion.div key={priority} whileTap={{ scale: 0.98 }}>
                  <Badge
                    variant={preferences.topPriorities.includes(priority) ? "default" : "outline"}
                    className={`cursor-pointer text-sm px-3 py-1.5 ${
                      preferences.topPriorities.includes(priority) 
                        ? "bg-gray-900 hover:bg-gray-800 text-white" 
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOption("topPriorities", priority)}
                  >
                    {preferences.topPriorities.includes(priority) && <Check className="mr-1.5 h-4 w-4" />}
                    {priority}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
