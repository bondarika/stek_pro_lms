/*
  Warnings:

  - You are about to drop the column `courseId` on the `Code` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Code" DROP CONSTRAINT "Code_courseId_fkey";

-- AlterTable
ALTER TABLE "Code" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "CourseCode" (
    "courseId" INTEGER NOT NULL,
    "codeId" INTEGER NOT NULL,

    CONSTRAINT "CourseCode_pkey" PRIMARY KEY ("courseId","codeId")
);

-- CreateTable
CREATE TABLE "_CourseCodes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseCodes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseCodes_B_index" ON "_CourseCodes"("B");

-- AddForeignKey
ALTER TABLE "CourseCode" ADD CONSTRAINT "CourseCode_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCode" ADD CONSTRAINT "CourseCode_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseCodes" ADD CONSTRAINT "_CourseCodes_A_fkey" FOREIGN KEY ("A") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseCodes" ADD CONSTRAINT "_CourseCodes_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
