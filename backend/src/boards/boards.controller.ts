import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardRequest, EditBoardRequest } from './dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/:publicId')
  async getAllBoardCards(@Param('publicId') publicId: string) {
    return this.boardsService.getAllBoardCards(publicId);
  }

  @Post()
  async createBoard(@Body() dto: CreateBoardRequest) {
    return this.boardsService.createBoard(dto);
  }

  @Patch('/:publicId')
  async editBoard(@Param('publicId') publicId: string, @Body() dto: EditBoardRequest) {
    return this.boardsService.editBoard(publicId, dto);
  }

  @Delete('/:publicId')
  async deleteBoard(@Param('publicId') publicId: string) {
    return this.boardsService.deleteBoard(publicId);
  }
}
