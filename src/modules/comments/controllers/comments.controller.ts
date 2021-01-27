import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { AuthGuard } from '../../auth/auth.guard';
import { ValidationPipe } from '../../mainProducts/exceptions/validation.pipe';
import { User } from '../../users/decorator/user.decorator';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Controller('api/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('product/:id')
  showCommentsById(@Param('id') productId: number, @Query('page') page : number) {
    return this.commentsService.showByProduct(productId, page);
  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') userId: number, @Query('page') page : number) {
    return this.commentsService.showByUser(userId, page);
  }

  @Post('product/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createComment(@Param('id') product: number, @User('id') user: number, @Body() comment: CreateCommentDto) {
    return this.commentsService.create(product, user, comment);
  }

  @Get(':id')
  showComment(@Param('id') id: number) {
    return this.commentsService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyComment(@Param('id') id: number, @User('id') user: number) {
    return this.commentsService.destroy(id, user);
  }
}