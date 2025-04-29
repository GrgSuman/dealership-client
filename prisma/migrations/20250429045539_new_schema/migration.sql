-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "savedVehicles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "bodyType" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "fuelConsumptionUrban" DOUBLE PRECISION,
    "fuelConsumptionExtraUrban" DOUBLE PRECISION,
    "fuelConsumptionCombined" DOUBLE PRECISION,
    "engineCapacity" DOUBLE PRECISION,
    "cylinders" INTEGER,
    "odometer" INTEGER NOT NULL,
    "driveType" TEXT,
    "doors" INTEGER,
    "seats" INTEGER,
    "color" TEXT,
    "rego" TEXT,
    "vin" TEXT,
    "stockNumber" TEXT,
    "images" TEXT[],
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
