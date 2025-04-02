-- AlterEnum
ALTER TYPE "Roles" ADD VALUE 'Gerente';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" JSONB;
