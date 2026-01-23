/*
  Warnings:

  - The `column` column on the `cards` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "board_id" SET DATA TYPE TEXT,
DROP COLUMN "column",
ADD COLUMN     "column" "CardStatus" NOT NULL DEFAULT 'TODO';

-- DropEnum
DROP TYPE "public"."BoardTitles";

-- CreateTable
CREATE TABLE "boards" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'My Board',

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boards_public_id_key" ON "boards"("public_id");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
