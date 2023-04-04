/*
  Warnings:

  - You are about to drop the column `langugage` on the `MatchPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchPost" DROP COLUMN "langugage",
ADD COLUMN     "language" TEXT;
