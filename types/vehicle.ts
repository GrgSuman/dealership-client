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
    COMING_SOON = "COMING_SOON"
}

export enum VehicleCondition {
    NEW = "NEW",
    USED = "USED",
    CERTIFIED = "CERTIFIED"
}

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    bodyType: BodyType;
    transmission: Transmission;
    fuelType: FuelType;
    odometer: number;
    color: string;
    stockNumber: string;
    description: string;
    features: string[];
    images: string[];
    status: VehicleStatus;
    condition: VehicleCondition;
    createdAt: Date;
    updatedAt: Date;
} 