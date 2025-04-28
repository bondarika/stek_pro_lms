/*
  Warnings:

  - The primary key for the `PasswordResetToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PasswordResetToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_resetToken_key";

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("resetToken");
