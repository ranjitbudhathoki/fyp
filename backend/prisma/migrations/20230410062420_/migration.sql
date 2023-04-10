/*
  Warnings:

  - You are about to drop the column `reason` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `reporterId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `reportedUserId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reason",
DROP COLUMN "reporterId",
DROP COLUMN "targetId",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reportedUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
