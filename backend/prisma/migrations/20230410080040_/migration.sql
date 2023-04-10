-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "senderAdminId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderAdminId_fkey" FOREIGN KEY ("senderAdminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
