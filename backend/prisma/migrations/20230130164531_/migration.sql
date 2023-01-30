/*
  Warnings:

  - You are about to drop the column `createdaAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdaAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
