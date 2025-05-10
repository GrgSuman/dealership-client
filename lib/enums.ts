export enum BodyType {
    SEDAN = "SEDAN",
    SUV = "SUV",
    HATCHBACK = "HATCHBACK",
    WAGON = "WAGON",
    UTE = "UTE",
    VAN = "VAN",
    COUPE = "COUPE",
    CONVERTIBLE = "CONVERTIBLE"
}

export enum Transmission {
    MANUAL = "MANUAL",
    AUTOMATIC = "AUTOMATIC",
    CVT = "CVT",
    DCT = "DCT"
}

export enum FuelType {
    PETROL = "PETROL",
    DIESEL = "DIESEL",
    ELECTRIC = "ELECTRIC",
    HYBRID = "HYBRID",
    PLUGIN_HYBRID = "PLUGIN_HYBRID"
}

export enum VehicleStatus {
    AVAILABLE = "AVAILABLE",
    SOLD = "SOLD",
    RESERVED = "RESERVED"
}

export enum VehicleCondition {
    NEW = "NEW",
    USED = "USED",
    DEMO = "DEMO"
}

// Helper function to format enum values for display
export function formatEnum(value: string): string {
    return value
        .split("_")
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ")
} 