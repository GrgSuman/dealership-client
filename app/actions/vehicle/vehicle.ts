"use server"

import prisma from "@/config/db"
import { revalidatePath } from "next/cache"
import { Vehicle } from "@prisma/client"

export async function createVehicle(data: Omit<Vehicle, "id" | "createdAt" | "updatedAt" | "viewsCount">) {
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        ...data,
        viewsCount: 0
      }
    })
    revalidatePath("/admin/vehicles")
    return { success: true, data: vehicle }
  } catch (error) {
    console.error("Error creating vehicle:", error)
    return { success: false, error: "Failed to create vehicle" }
  }
}

export async function updateVehicle(id: string, data: Partial<Vehicle>) {
  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data
    })
    revalidatePath("/admin/vehicles")
    revalidatePath(`/vehicles/${id}`)
    return { success: true, data: vehicle }
  } catch (error) {
    console.error("Error updating vehicle:", error)
    return { success: false, error: "Failed to update vehicle" }
  }
}

export async function deleteVehicle(id: string) {
  try {
    await prisma.vehicle.delete({
      where: { id }
    })
    revalidatePath("/admin/vehicles")
    return { success: true }
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    return { success: false, error: "Failed to delete vehicle" }
  }
}

export async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return { success: true, data: vehicles }
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return { success: false, error: "Failed to fetch vehicles" }
  }
}

export async function getVehicleById(id: string) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id }
    })
    return { success: true, data: vehicle }
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return { success: false, error: "Failed to fetch vehicle" }
  }
} 