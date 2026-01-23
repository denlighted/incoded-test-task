import {Body, Controller, Post} from '@nestjs/common';
import { CardsService } from './cards.service';
import {CardCreationRequest} from "./dto/card-creation.dto";

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(@Body() dto: CardCreationRequest) {
    return this.cardsService.createCard(dto);
  }
}
