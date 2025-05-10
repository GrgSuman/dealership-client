/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Add nullable columns
ALTER TABLE "User" ADD COLUMN "firstName" VARCHAR(50);
ALTER TABLE "User" ADD COLUMN "lastName" VARCHAR(50);

-- Step 2: Update existing records with default values
UPDATE "User" SET "firstName" = 'User', "lastName" = 'User' WHERE "firstName" IS NULL;

-- Step 3: Make columns required
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;
