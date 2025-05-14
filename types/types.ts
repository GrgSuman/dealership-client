type Preference = {
  budgetMin: number
  budgetMax: number
  carTypes: string[]
  fuelTypes: string[]
  brand: string[]
  features: string[]
  primarilyUse: string[]
  topPriorities: string[]
}

type PreferenceCategory = 'carTypes' | 'fuelTypes' | 'brand' | 'features' | 'primarilyUse' | 'topPriorities'

export type { Preference, PreferenceCategory }
