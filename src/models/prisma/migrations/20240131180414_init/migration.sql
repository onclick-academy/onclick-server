/*
  Warnings:

  - You are about to drop the column `UserDtoId` on the `BlockState` table. All the data in the column will be lost.
  - You are about to drop the column `UserDtoId` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `UserDtoId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `UserDtoId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `UserDtoId` on the `SuspendState` table. All the data in the column will be lost.
  - You are about to drop the column `UserDtoId` on the `WishList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,userId,targetType]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BlockState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Instructor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SuspendState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlockState" DROP CONSTRAINT "BlockState_UserDtoId_fkey";

-- DropForeignKey
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_UserDtoId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_UserDtoId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_UserDtoId_fkey";

-- DropForeignKey
ALTER TABLE "SuspendState" DROP CONSTRAINT "SuspendState_UserDtoId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_UserDtoId_fkey";

-- DropIndex
DROP INDEX "Instructor_UserDtoId_key";

-- DropIndex
DROP INDEX "Rating_courseId_UserDtoId_targetType_key";

-- DropIndex
DROP INDEX "Student_UserDtoId_key";

-- AlterTable
ALTER TABLE "BlockState" DROP COLUMN "UserDtoId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Instructor" DROP COLUMN "UserDtoId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "UserDtoId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "UserDtoId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SuspendState" DROP COLUMN "UserDtoId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WishList" DROP COLUMN "UserDtoId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_courseId_userId_targetType_key" ON "Rating"("courseId", "userId", "targetType");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspendState" ADD CONSTRAINT "SuspendState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockState" ADD CONSTRAINT "BlockState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
