import { CardStatus } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CardMoveRequest {
  @IsNotEmpty({ message: 'Column should not be empty' })
  @IsEnum(CardStatus, { message: 'Incorrect status for column' })
  column: CardStatus;

  @IsInt({ message: 'Card position should be a number' })
  @IsNotEmpty({ message: 'Card position should not be empty' })
  position: number;
}
