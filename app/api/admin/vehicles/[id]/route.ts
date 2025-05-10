import { NextResponse } from "next/server";
import { prisma } from "@/config/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.vehicle.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        return NextResponse.json(
            { error: "Failed to delete vehicle" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
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
        } = body;

        const vehicle = await prisma.vehicle.update({
            where: {
                id: params.id,
            },
            data: {
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
                features: features ? features.split("\n") : [],
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