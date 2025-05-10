import { NextResponse } from "next/server";
import { prisma } from "@/config/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received request body:", body); // Log the request body

        const {
            make,
            model,
            year,
            price,
            bodyType,
            transmission,
            fuelType,
            odometer,
            color,
            stockNumber,
            description,
            features,
            images,
        } = body;

        // Validate required fields
        if (!make || !model || !year || !price || !bodyType || !transmission || !fuelType || !odometer || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate enum values
        const validBodyTypes = ["SEDAN", "SUV", "HATCHBACK", "WAGON", "UTE", "VAN", "COUPE", "CONVERTIBLE"];
        const validTransmissions = ["MANUAL", "AUTOMATIC", "CVT", "DCT"];
        const validFuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "PLUGIN_HYBRID"];

        if (!validBodyTypes.includes(bodyType)) {
            return NextResponse.json(
                { error: `Invalid body type: ${bodyType}` },
                { status: 400 }
            );
        }

        if (!validTransmissions.includes(transmission)) {
            return NextResponse.json(
                { error: `Invalid transmission: ${transmission}` },
                { status: 400 }
            );
        }

        if (!validFuelTypes.includes(fuelType)) {
            return NextResponse.json(
                { error: `Invalid fuel type: ${fuelType}` },
                { status: 400 }
            );
        }

        const vehicle = await prisma.vehicle.create({
            data: {
                make,
                model,
                year,
                price: Math.round(price * 100), // Convert to cents
                bodyType: bodyType as any, // Cast to enum
                transmission: transmission as any, // Cast to enum
                fuelType: fuelType as any, // Cast to enum
                odometer,
                color,
                stockNumber,
                description,
                features: features ? features.split("\n") : [],
                images: images || [],
                status: "AVAILABLE",
                condition: "USED",
            },
        });

        console.log("Created vehicle:", vehicle); // Log the created vehicle
        return NextResponse.json(vehicle);
    } catch (error) {
        console.error("Error creating vehicle:", error);
        // Return more detailed error information
        return NextResponse.json(
            {
                error: "Failed to create vehicle",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        // Convert price from cents to dollars for display
        const formattedVehicles = vehicles.map(vehicle => ({
            ...vehicle,
            price: vehicle.price / 100
        }));

        return NextResponse.json(formattedVehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return NextResponse.json(
            { error: "Failed to fetch vehicles" },
            { status: 500 }
        );
    }
} 