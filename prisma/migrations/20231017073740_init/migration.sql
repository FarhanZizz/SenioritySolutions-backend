-- CreateEnum
CREATE TYPE "Division" AS ENUM ('CHITTAGONG', 'DHAKA', 'SYLHET', 'RAJSHAHI', 'RANGPUR', 'BARISAL', 'KHULNA');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "location" "Division" NOT NULL DEFAULT 'CHITTAGONG';