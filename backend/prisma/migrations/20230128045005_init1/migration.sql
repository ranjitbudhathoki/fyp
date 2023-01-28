/*
  Warnings:

  - You are about to drop the column `profileId` on the `Feed` table. All the data in the column will be lost.
  - You are about to drop the column `githubAccessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Feed_profileId_key";

-- AlterTable
ALTER TABLE "Feed" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubAccessToken",
ALTER COLUMN "photoUrl" DROP NOT NULL;

-- DropTable
DROP TABLE "Profile";
