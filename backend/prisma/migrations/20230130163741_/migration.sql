/*
  Warnings:

  - You are about to drop the column `birthDay` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_first_time` on the `User` table. All the data in the column will be lost.
  - Added the required column `createdaAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDay",
DROP COLUMN "is_first_time",
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "createdaAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
