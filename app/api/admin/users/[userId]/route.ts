import { NextResponse } from "next/server";
import { prisma } from "@/config/db";

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;
        await prisma.user.delete({
            where: { id: userId },
        });
        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;
        const { firstName, lastName, email, role } = await req.json();
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { firstName, lastName, email, role },
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 