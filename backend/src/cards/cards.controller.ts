import {Body, Controller, Delete, Param, Patch, Post} from '@nestjs/common';
import { CardsService } from './cards.service';
import {CardCreationRequest, CardMoveRequest, UpdateCardRequest} from "./dto";

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(@Body() dto: CardCreationRequest) {
    return this.cardsService.createCard(dto);
  }

  @Patch('/:cardId')
  async updateCard(@Param('cardId') cardId:string, @Body() dto:UpdateCardRequest) {
    return this.cardsService.updateCard(cardId, dto);
  }

  @Patch("/move/:cardId")
  async moveCard(@Param('cardId') cardId:string, @Body() dto:CardMoveRequest) {
    return this.cardsService.moveCard(cardId, dto);
  }

  @Delete('/:cardId')
  async deleteCard(@Param('cardId') cardId: string) {
    return this.cardsService.deleteCard(cardId);
  }

}
