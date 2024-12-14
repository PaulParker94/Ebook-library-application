/*
  Warnings:

  - You are about to drop the column `file` on the `Ebook` table. All the data in the column will be lost.
  - Added the required column `coverPageUrl` to the `Ebook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ebook" DROP COLUMN "file",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "coverPageUrl" TEXT NOT NULL;
