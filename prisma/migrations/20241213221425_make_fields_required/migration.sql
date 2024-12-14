/*
  Warnings:

  - Made the column `description` on table `Ebook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedAt` on table `Ebook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileUrl` on table `Ebook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ebook" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "publishedAt" SET NOT NULL,
ALTER COLUMN "fileUrl" SET NOT NULL;
