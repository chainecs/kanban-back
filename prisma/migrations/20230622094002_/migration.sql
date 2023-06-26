/*
  Warnings:

  - You are about to drop the column `contactInformation` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `email` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "contactInformation",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lineId" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
