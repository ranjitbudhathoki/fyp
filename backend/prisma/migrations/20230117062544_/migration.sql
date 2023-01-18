-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "githubId" TEXT,
    "username" TEXT,
    "displayName" TEXT,
    "bio" TEXT,
    "gender" TEXT,
    "preferredGender" TEXT,
    "birthday" TIMESTAMP(3),
    "photoUrl" TEXT NOT NULL,
    "githubAccessToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
