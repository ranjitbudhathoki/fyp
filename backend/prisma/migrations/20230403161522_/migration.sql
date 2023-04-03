-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_postId_fkey";

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_postId_fkey" FOREIGN KEY ("postId") REFERENCES "MatchPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
