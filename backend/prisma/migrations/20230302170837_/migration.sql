/*
  Warnings:

  - Added the required column `imgUrl` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_postId_fkey" FOREIGN KEY ("postId") REFERENCES "MatchPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
