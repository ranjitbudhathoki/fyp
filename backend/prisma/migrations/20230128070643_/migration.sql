/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
ADD COLUMN     "birthDay" TIMESTAMP(3),
ADD COLUMN     "is_first_time" BOOLEAN NOT NULL DEFAULT false;
