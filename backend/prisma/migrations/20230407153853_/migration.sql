-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'COMMENT';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "HelpPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
