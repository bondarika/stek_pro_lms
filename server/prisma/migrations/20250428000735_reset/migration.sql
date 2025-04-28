/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_resetToken_key" ON "PasswordResetToken"("resetToken");
