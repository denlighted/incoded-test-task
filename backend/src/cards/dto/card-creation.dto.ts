import { CardStatus } from '@prisma/client';

export class CardCreationRequest {

  boardId: string;
  title: string;
  description: string;
  column: CardStatus;
}
