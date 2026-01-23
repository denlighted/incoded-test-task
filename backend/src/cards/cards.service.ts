import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardCreationRequest } from './dto/card-creation.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

    async createCard(dto:CardCreationRequest){
    const { boardId, title, description, column } = dto;
      return this.prismaService.card.create({
          data: {
              title,
              description,
              boardId,
              column
          }
      });
    }
}
