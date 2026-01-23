import { BoardTitles } from '@prisma/client';

export class CardCreationRequest {
  boardId: string;
  title: string;
  description: string;
  column: BoardTitles;
}
