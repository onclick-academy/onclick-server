/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `courseRate` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `instructorRate` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the `CourseRate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InstructorRate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TARGET_RATE" AS ENUM ('COURSE', 'INSTRUCTOR');

-- DropForeignKey
ALTER TABLE "CourseRate" DROP CONSTRAINT "CourseRate_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "CourseReview" DROP CONSTRAINT "CourseReview_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseReview" DROP CONSTRAINT "CourseReview_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_adminId_fkey";

-- DropForeignKey
ALTER TABLE "InstructorRate" DROP CONSTRAINT "InstructorRate_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_courseId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseRate",
DROP COLUMN "instructorRate",
DROP COLUMN "languages",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
CREATE SEQUENCE lecturescontent_order_seq;
ALTER TABLE "LecturesContent" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "order" SET DEFAULT nextval('lecturescontent_order_seq');
ALTER SEQUENCE lecturescontent_order_seq OWNED BY "LecturesContent"."order";

-- AlterTable
ALTER TABLE "LecturesMaterials" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "courseId",
DROP COLUMN "name",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WishList" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "CourseRate";

-- DropTable
DROP TABLE "CourseReview";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "InstructorRate";

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "targetType" "TARGET_RATE" NOT NULL,
    "targetId" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "courseId" TEXT NOT NULL,
    "UserDtoId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" JSONB,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "cover" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_courseId_UserDtoId_targetType_key" ON "Rating"("courseId", "UserDtoId", "targetType");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToTopic_AB_unique" ON "_CourseToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToTopic_B_index" ON "_CourseToTopic"("B");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_UserDtoId_fkey" FOREIGN KEY ("UserDtoId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTopic" ADD CONSTRAINT "_CourseToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTopic" ADD CONSTRAINT "_CourseToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
