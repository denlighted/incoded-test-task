import {Body, Controller, Delete, Param, Patch, Post} from '@nestjs/common';
import { CardsService } from './cards.service';
import {CardCreationRequest, UpdateCardRequest} from "./dto";

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(@Body() dto: CardCreationRequest) {
    return this.cardsService.createCard(dto);
  }

  @Patch('/:id')
  async updateCard(@Param('cardId') cardId:string, dto:UpdateCardRequest) {
    return this.cardsService.updateCard(cardId, dto);
  }

  @Delete('/:id')
  async deleteCard(@Param('cardId') cardId: string) {
    return this.cardsService.deleteCard(cardId);
  }

}
