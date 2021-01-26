import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';

import { CommentsService } from '../services/comments.service';
import { AuthGuard } from '../../auth/auth.guard';
import { ValidationPipe } from '../../mainProducts/exceptions/validation.pipe';
import { User } from '../../users/decorator/user.decorator';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Controller('api/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {
  }

  @Get('product/:id')
  showCommentsById(@Param('id') product: number) {

  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') user: number) {

  }

  @Post('product/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createComment(@Param('id') product: number, @User('id') user: number, @Body() comment: CreateCommentDto) {

  }

  @Get(':id')
  showComment(@Param('id') id: number) {
    return this.commentsService.show(id)
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyComment(@Param('id') id: number, @User('id') user: number) {

  }
}