/*
  Warnings:

  - You are about to drop the column `feedId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_feedId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropIndex
DROP INDEX "Like_userId_postId_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "feedId",
DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "body" DROP NOT NULL;
