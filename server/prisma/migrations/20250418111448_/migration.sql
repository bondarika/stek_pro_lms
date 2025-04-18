/*
  Warnings:

  - You are about to drop the `CourseCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseCodes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseCode" DROP CONSTRAINT "CourseCode_codeId_fkey";

-- DropForeignKey
ALTER TABLE "CourseCode" DROP CONSTRAINT "CourseCode_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseProgress" DROP CONSTRAINT "UserCourseProgress_courseId_fkey";

-- DropForeignKey
ALTER TABLE "_CourseCodes" DROP CONSTRAINT "_CourseCodes_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseCodes" DROP CONSTRAINT "_CourseCodes_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "type" TEXT;

-- DropTable
DROP TABLE "CourseCode";

-- DropTable
DROP TABLE "_CourseCodes";

-- CreateTable
CREATE TABLE "_CodeToCourse" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CodeToCourse_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CodeToCourse_B_index" ON "_CodeToCourse"("B");

-- AddForeignKey
ALTER TABLE "_CodeToCourse" ADD CONSTRAINT "_CodeToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CodeToCourse" ADD CONSTRAINT "_CodeToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
