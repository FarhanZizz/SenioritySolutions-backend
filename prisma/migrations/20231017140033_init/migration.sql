/*
  Warnings:

  - The `category` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "imageURL" TEXT NOT NULL DEFAULT '#',
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'COMPANIONSHIP',
DROP COLUMN "location",
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'CHITTAGONG';
