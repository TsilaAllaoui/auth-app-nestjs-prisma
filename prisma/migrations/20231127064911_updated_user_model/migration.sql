/*
  Warnings:

  - You are about to drop the column `password_hashed` on the `User` table. All the data in the column will be lost.
  - Added the required column `hashed_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password_hashed",
ADD COLUMN     "hashed_password" TEXT NOT NULL;
