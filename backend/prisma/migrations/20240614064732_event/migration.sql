/*
  Warnings:

  - You are about to drop the column `departmentId` on the `event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_departmentId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `departmentId`,
    ADD COLUMN `holiday` BOOLEAN NOT NULL DEFAULT false;
