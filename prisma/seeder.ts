import { PrismaClient, BodyType, Transmission, FuelType, VehicleStatus, VehicleCondition } from '@prisma/client';
// import { vehicles } from '../newData';


const vehicles = [
  {
    make: "Hyundai",
    model: "Tucson Elite N Line",
    year: 2022,
    price: 41990.00,
    bodyType: "SUV",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    fuelConsumptionUrban: 9.6,
    fuelConsumptionExtraUrban: 6.5,
    fuelConsumptionCombined: 7.7,
    engineCapacity: 1.6,
    cylinders: 4,
    odometer: 27860,
    driveType: "AWD",
    doors: 5,
    seats: 5,
    color: "Shadow Grey",
    rego: "CDE567",
    vin: "TMAJ38A67NJ789012",
    stockNumber: "HY22TUC019",
    images: [
      "https://www.hyundai.com/au/en/vehicles/tucson/2022/elite-n-line/hero.jpg",
      "https://www.hyundai.com/au/en/vehicles/tucson/2022/elite-n-line/interior.jpg",
      "https://www.hyundai.com/au/en/vehicles/tucson/2022/elite-n-line/exterior.jpg"
    ],
    description: "This Hyundai Tucson Elite N Line combines distinctive sporty styling with practical SUV versatility. The turbocharged 1.6L engine delivers 132kW through a responsive 7-speed DCT transmission. Features N Line exterior and interior styling with all-wheel drive capability for all-weather confidence.",
    status: "AVAILABLE",
    condition: "USED",
    features: ["N Line Sports Package", "Leather Interior", "Panoramic Sunroof", "Bose Premium Audio", "10.25\" Touchscreen", "Heated & Ventilated Seats", "Blind-Spot View Monitor", "Apple CarPlay", "Android Auto"],
    viewsCount: 124,
    createdAt: new Date("2024-12-05T11:30:00Z"),
    updatedAt: new Date("2024-12-05T11:30:00Z")
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
