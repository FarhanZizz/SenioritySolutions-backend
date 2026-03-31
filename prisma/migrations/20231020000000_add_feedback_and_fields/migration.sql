-- AlterTable: Add optional fields to User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "profileImage" TEXT;
ALTER TABLE "User" ALTER COLUMN "phone" TYPE TEXT USING phone::TEXT;

-- AlterTable: Add optional fields to Service
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable: Add createdAt to Booking
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable: Add userId and userName to Review
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "userId" TEXT;
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "userName" TEXT;

-- AlterTable: Add imageUrl to BlogPost
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;

-- CreateTable: Feedback
CREATE TABLE IF NOT EXISTS "Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
