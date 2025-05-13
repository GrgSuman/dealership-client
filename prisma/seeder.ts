import { PrismaClient, BodyType, Transmission, FuelType, VehicleStatus, VehicleCondition } from '@prisma/client';
// import { vehicles } from '../newData';


const vehicles = [
    {
        make: "Hyundai",
        model: "i30 N Line",
        year: 2024,
        price: 38990.00,
        bodyType: "HATCHBACK",
        transmission: "DCT",
        fuelType: "PETROL",
        fuelConsumptionUrban: 8.2,
        fuelConsumptionExtraUrban: 5.6,
        fuelConsumptionCombined: 6.8,
        engineCapacity: 1.5,
        cylinders: 4,
        odometer: 15,
        driveType: "FWD",
        doors: 5,
        seats: 5,
        color: "Performance Blue",
        rego: "JKL012",
        vin: "KMHH351CBNU123456",
        stockNumber: "HY24I30004",
        images: [
          "https://www.hyundai.com/au/en/vehicles/i30-n-line/hero.jpg",
          "https://www.hyundai.com/au/en/vehicles/i30-n-line/interior.jpg",
          "https://www.hyundai.com/au/en/vehicles/i30-n-line/exterior.jpg"
        ],
        description: "This sporty 2024 Hyundai i30 N Line features a turbocharged 1.5L engine paired with a quick-shifting 7-speed DCT. Designed with performance styling and enhanced handling characteristics for an engaging driving experience. Packed with tech and safety features for daily practicality.",
        status: "AVAILABLE",
        condition: "NEW",
        features: ["Sports Body Kit", "LED Headlights", "10.25\" Touchscreen", "Paddle Shifters", "Wireless Charging", "Blind Spot Monitoring", "Sports Seats", "Apple CarPlay", "Android Auto"],
        viewsCount: 78,
        createdAt: new Date("2024-03-18T16:20:00Z"),
        updatedAt: new Date("2024-03-18T16:20:00Z")
      }
]

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // Seed vehicles
  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        bodyType: vehicle.bodyType.toUpperCase() as BodyType,
        transmission: vehicle.transmission.toUpperCase() as Transmission,
        fuelType: vehicle.fuelType.toUpperCase() as FuelType,   
        fuelConsumptionUrban: vehicle.fuelConsumptionUrban,
        fuelConsumptionExtraUrban: vehicle.fuelConsumptionExtraUrban,
        fuelConsumptionCombined: vehicle.fuelConsumptionCombined,
        engineCapacity: vehicle.engineCapacity,
        cylinders: vehicle.cylinders,
        odometer: vehicle.odometer,
        driveType: vehicle.driveType,
        doors: vehicle.doors,
        seats: vehicle.seats,
        color: vehicle.color,
        rego: vehicle.rego,
        vin: vehicle.vin,
        stockNumber: vehicle.stockNumber,
        images: vehicle.images,
        description: vehicle.description,
        status: vehicle.status.toUpperCase() as VehicleStatus,
        condition: vehicle.condition.toUpperCase() as VehicleCondition,
        features: vehicle.features,
        viewsCount: vehicle.viewsCount,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt
      }
    });
  }

  console.log('✅ Seeding completed');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
