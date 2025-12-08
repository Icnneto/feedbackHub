/*
  Warnings:

  - The `category` column on the `suggestions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `suggestions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SuggestionCategory" AS ENUM ('FEATURE', 'BUG', 'IMPROVMENT');

-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('OPEN', 'PLANNED', 'IN_PROGRESS', 'LIVE');

-- AlterTable
ALTER TABLE "suggestions" DROP COLUMN "category",
ADD COLUMN     "category" "SuggestionCategory" NOT NULL DEFAULT 'FEATURE',
DROP COLUMN "status",
ADD COLUMN     "status" "SuggestionStatus" NOT NULL DEFAULT 'OPEN';
