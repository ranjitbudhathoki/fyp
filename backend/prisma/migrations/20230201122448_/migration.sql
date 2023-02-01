-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "project_link" TEXT,
ALTER COLUMN "body" DROP NOT NULL;
