import { NextResponse } from "next/server";
import { prisma } from "@/config/db";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const vehicle = await prisma.vehicle.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json(vehicle);
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        return NextResponse.json(
            { error: "Failed to delete vehicle" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();

        const vehicle = await prisma.vehicle.update({
            where: {
                id: params.id,
            },
            data: {
                make: data.make,
                model: data.model,
                year: data.year,
                price: data.price,
                mileage: data.mileage,
                color: data.color,
                vin: data.vin,
                description: data.description,
                bodyType: data.bodyType,
                transmission: data.transmission,
                fuelType: data.fuelType,
                status: data.status,
                condition: data.condition,
                images: data.images,
            },
        });

        return NextResponse.json(vehicle);
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return NextResponse.json(
            { error: "Failed to update vehicle" },
            { status: 500 }
        );
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!vehicle) {
            return NextResponse.json(
                { error: "Vehicle not found" },
                { status: 404 }
            );
        }

        // Format the price from cents to dollars for display
        const formattedVehicle = {
            ...vehicle,
            price: vehicle.price / 100,
        };

        return NextResponse.json(formattedVehicle);
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        return NextResponse.json(
            { error: "Failed to fetch vehicle" },
            { status: 500 }
        );
    }
} 