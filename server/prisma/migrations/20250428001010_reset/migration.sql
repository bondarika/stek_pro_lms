/*
  Warnings:

  - The primary key for the `PasswordResetToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[resetToken]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_resetToken_key" ON "PasswordResetToken"("resetToken");
