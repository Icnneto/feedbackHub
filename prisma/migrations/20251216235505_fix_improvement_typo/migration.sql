/*
  Warnings:

  - The values [IMPROVMENT] on the enum `SuggestionCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SuggestionCategory_new" AS ENUM ('FEATURE', 'BUG', 'IMPROVEMENT');
ALTER TABLE "suggestions" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "suggestions" ALTER COLUMN "category" TYPE "SuggestionCategory_new" USING ("category"::text::"SuggestionCategory_new");
ALTER TYPE "SuggestionCategory" RENAME TO "SuggestionCategory_old";
ALTER TYPE "SuggestionCategory_new" RENAME TO "SuggestionCategory";
DROP TYPE "SuggestionCategory_old";
ALTER TABLE "suggestions" ALTER COLUMN "category" SET DEFAULT 'FEATURE';
COMMIT;
