import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CardCreationRequest, CardMoveRequest, UpdateCardRequest} from './dto';


@Injectable()
export class CardsService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async createCard(dto: CardCreationRequest) {
        const {boardId, title, description, column} = dto;

        const lastCard = await this.prismaService.card.findFirst({
            where: {
                boardId: boardId,
                column: column
            },
            orderBy: {
                position: 'desc'
            }
        })

        const newPosition = lastCard ? lastCard.position + 1 : 0;


        return this.prismaService.card.create({
            data: {
                title,
                description,
                board: {connect: {id: boardId}},
                column,
                position: newPosition,
            }
        });
    }

    async updateCard(cardId: string, dto: UpdateCardRequest) {
        const card = await this.prismaService.card.findUnique({where: {id: cardId}})

        if (!card) {
            throw new NotFoundException('Card not Found');
        }

        const {title, description} = dto

        return this.prismaService.card.update({
            where: {id: card.id},
            data: {
                title: title,
                description: description,
            }
        })
    }

    async deleteCard(cardId: string): Promise<string> {
        const card = await this.prismaService.card.findUnique({where: {id: cardId}})

        if (!card) {
            throw new NotFoundException("Card not found")
        }

        await this.prismaService.card.delete({
            where: {
                id: cardId
            }
        })

        return cardId;
    }

    async moveCard(cardId: string, dto: CardMoveRequest) {
        const card = await this.prismaService.card.findUnique({where: {id: cardId}})

        if (!card) {
            throw new NotFoundException("Card not Found")
        }

        const {column, position} = dto

        return this.prismaService.card.update({
            where: {id: card.id},
            data: {
                column,
                position
            }
        })


    }
}
