-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Booked', 'Pending', 'Initiated', 'Cancelled');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "flightId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "noOfSeats" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Initiated',
    "totalCost" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
