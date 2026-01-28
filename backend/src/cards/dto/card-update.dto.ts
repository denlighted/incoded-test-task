import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardRequest {
  @IsOptional()
  @IsString({ message: 'Title should be a string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description should be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  description?: string;
}
