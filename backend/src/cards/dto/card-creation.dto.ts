import { CardStatus } from '@prisma/client';
import {IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CardCreationRequest {

  @IsNotEmpty({message:"Board id should not be empty"})
  @IsString({message:"Board id should be a string"})
  boardId: string;

  @IsNotEmpty({message:"Title should not be empty"})
  @IsString({message:"Title should be a string"})
  @Length(5, 35)
  title: string;

  @IsOptional()
  @IsString({message:"Description should be a string"})
  @Length(5, 50)
  description: string;

  @IsEnum(CardStatus, {message:"Incorrect status for column"})
  column: CardStatus;
}
