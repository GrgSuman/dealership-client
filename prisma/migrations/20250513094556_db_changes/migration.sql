/*
  Warnings:

  - You are about to drop the column `carIds` on the `Activity` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "carIds",
ADD COLUMN     "carTitles" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "SavedVehicle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedVehicle_userId_idx" ON "SavedVehicle"("userId");

-- CreateIndex
CREATE INDEX "SavedVehicle_vehicleId_idx" ON "SavedVehicle"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedVehicle_userId_vehicleId_key" ON "SavedVehicle"("userId", "vehicleId");

-- AddForeignKey
ALTER TABLE "SavedVehicle" ADD CONSTRAINT "SavedVehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedVehicle" ADD CONSTRAINT "SavedVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
