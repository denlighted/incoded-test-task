import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateBoardRequest, EditBoardRequest} from "./dto";
import {Board} from "@prisma/client";
import {customAlphabet} from "nanoid";


@Injectable()
export class BoardsService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAllBoardCards(publicId: string):Promise<Board> {
        const board = await this.prismaService.board.findUnique({
            where: {publicId: publicId},
            include: {Cards: {
                orderBy:{
                    position:'asc'
                }
                }},

        });

        if (!board) {
            throw new NotFoundException('Board not found');
        }
        return board;

    }

    async createBoard(dto:CreateBoardRequest):Promise<Board>{
        const generateId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6)
        const hashedId = generateId();

        return this.prismaService.board.create({data: {
            publicId:hashedId,
            title: dto.title,

            }})
    }

    async editBoard(publicId: string, dto: EditBoardRequest) {
        const board = await this.prismaService.board.findUnique({where:{publicId: publicId}})

        if(!board){
            throw new NotFoundException('Board not found');
        }

        return  this.prismaService.board.update({
            where: {publicId: publicId}, data: {
                title: dto.title,
            }
        })

    }

    async deleteBoard(publicId: string):Promise<string>{
        const board = await this.prismaService.board.findUnique({where:{publicId: publicId}})

        if(!board){
            throw new NotFoundException('Board not found');
        }
        await this.prismaService.board.delete({where:{publicId: publicId}})
        return publicId;
    }
}
