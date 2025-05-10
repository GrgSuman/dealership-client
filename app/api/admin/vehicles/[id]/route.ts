import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/db";
import { BodyType, Transmission, FuelType } from "@prisma/client";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // Check if vehicle exists before deleting
        const existingVehicle = await prisma.vehicle.findUnique({
            where: { id }
        });

        if (!existingVehicle) {
            return NextResponse.json(
                { error: "Vehicle not found" },
                { status: 404 }
            );
        }

        await prisma.vehicle.delete({
            where: { id }
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

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const data = await req.json();

        // Check if vehicle exists
        const existingVehicle = await prisma.vehicle.findUnique({
            where: { id }
        });

        if (!existingVehicle) {
            return NextResponse.json(
                { error: "Vehicle not found" },
                { status: 404 }
            );
        }

        // Validate price if provided
        if (data.price !== undefined) {
            const price = Number(data.price);
            if (isNaN(price) || !isFinite(price) || price <= 0) {
                return NextResponse.json(
                    { error: "Invalid price value" },
                    { status: 400 }
                );
            }
            data.price = price;
        }

        // Validate year if provided
        if (data.year !== undefined) {
            const year = Number(data.year);
            if (isNaN(year) || !Number.isInteger(year) || year < 1900 || year > new Date().getFullYear() + 1) {
                return NextResponse.json(
                    { error: "Invalid year value" },
                    { status: 400 }
                );
            }
            data.year = year;
        }

        // Validate odometer if provided
        if (data.odometer !== undefined) {
            const odometer = Number(data.odometer);
            if (isNaN(odometer) || !Number.isInteger(odometer) || odometer < 0) {
                return NextResponse.json(
                    { error: "Invalid odometer value" },
                    { status: 400 }
                );
            }
            data.odometer = odometer;
        }

        // Validate enum values if provided
        if (data.bodyType && !Object.values(BodyType).includes(data.bodyType)) {
            return NextResponse.json(
                { error: "Invalid body type" },
                { status: 400 }
            );
        }

        if (data.transmission && !Object.values(Transmission).includes(data.transmission)) {
            return NextResponse.json(
                { error: "Invalid transmission type" },
                { status: 400 }
            );
        }

        if (data.fuelType && !Object.values(FuelType).includes(data.fuelType)) {
            return NextResponse.json(
                { error: "Invalid fuel type" },
                { status: 400 }
            );
        }

        // Update vehicle
        const updatedVehicle = await prisma.vehicle.update({
            where: { id },
            data
        });

        return NextResponse.json(updatedVehicle);
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return NextResponse.json(
            { error: "Failed to update vehicle" },
            { status: 500 }
        );
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id }
        });

        if (!vehicle) {
            return NextResponse.json(
                { error: "Vehicle not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(vehicle);
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        return NextResponse.json(
            { error: "Failed to fetch vehicle" },
            { status: 500 }
        );
    }
} 