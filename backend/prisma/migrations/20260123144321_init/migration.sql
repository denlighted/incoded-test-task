-- CreateEnum
CREATE TYPE "BoardTitles" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "board_id" INTEGER NOT NULL,
    "column" "BoardTitles" NOT NULL DEFAULT 'TODO',
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);
