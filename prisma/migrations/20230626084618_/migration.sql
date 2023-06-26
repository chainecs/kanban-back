/*
  Warnings:

  - Added the required column `createdTimestamp` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedTimestamp` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "createdTimestamp" INTEGER NOT NULL,
ADD COLUMN     "updatedTimestamp" INTEGER NOT NULL;
