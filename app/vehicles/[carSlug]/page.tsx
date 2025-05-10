import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { VehicleDetail } from "@/components/sections/VehicleDetail"
import { Metadata } from "next"

interface PageProps {
  params: {
    carSlug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { carSlug } = await Promise.resolve(params)

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: carSlug },
  })

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found',
    }
  }

  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { carSlug } = await Promise.resolve(params)

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: carSlug }
  })

  if (!vehicle) {
    notFound()
  }

  return <VehicleDetail vehicle={vehicle} />
}
