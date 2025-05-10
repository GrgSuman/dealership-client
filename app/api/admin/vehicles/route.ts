import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { make, model, year, price, odometer, color, vin, description, bodyType, transmission, fuelType, status, condition, images } = body;

        // Validate required fields
        const requiredFields = ['make', 'model', 'year', 'odometer', 'color', 'vin', 'description', 'bodyType', 'transmission', 'fuelType', 'status', 'condition'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate price
        const priceNum = Number(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            return NextResponse.json(
                { error: "Price must be a positive number" },
                { status: 400 }
            );
        }

        // Validate enum values
        const validBodyTypes = ["SEDAN", "SUV", "HATCHBACK", "WAGON", "UTE", "VAN", "COUPE", "CONVERTIBLE"];
        const validTransmissions = ["MANUAL", "AUTOMATIC", "CVT", "DCT"];
        const validFuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "PLUGIN_HYBRID"];

        if (!validBodyTypes.includes(bodyType)) {
            return NextResponse.json(
                { error: "Invalid body type" },
                { status: 400 }
            );
        }

        if (!validTransmissions.includes(transmission)) {
            return NextResponse.json(
                { error: "Invalid transmission type" },
                { status: 400 }
            );
        }

        if (!validFuelTypes.includes(fuelType)) {
            return NextResponse.json(
                { error: "Invalid fuel type" },
                { status: 400 }
            );
        }

        // Create vehicle
        const vehicle = await prisma.vehicle.create({
            data: {
                make,
                model,
                year: parseInt(year),
                price: priceNum,
                odometer: parseInt(odometer),
                color,
                vin,
                description,
                bodyType,
                transmission,
                fuelType,
                status,
                condition,
                images: images || [],
            },
        });

        return NextResponse.json(vehicle);
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return NextResponse.json(
            { error: "Failed to create vehicle" },
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

        return NextResponse.json(vehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return NextResponse.json(
            { error: "Failed to fetch vehicles" },
            { status: 500 }
        );
    }
} 