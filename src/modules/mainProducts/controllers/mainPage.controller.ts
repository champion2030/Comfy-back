import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { MainPageService } from '../services/mainPage.service';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';
import { ValidationPipe } from '../exceptions/validation.pipe';
import { AuthGuard } from '../../auth/auth.guard';
import { User } from '../../users/decorator/user.decorator';

@Controller('comfy/main')
export class MainPageController {
  constructor(private mainPageService: MainPageService) {}

  @Get()
  findAll(){
    return this.mainPageService.findAll()
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  create(@User('id') user, @Body() createMainPageDto: CreateMainPageDto){
    return this.mainPageService.create(user, createMainPageDto)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.mainPageService.findById(id)
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateOne(@Param('id') id: number,@User('id') user, @Body() updateMainPageDto: Partial<UpdateMainPageDto>) {
    return this.mainPageService.updateOne(id, user, updateMainPageDto)
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteOne(@Param('id') id: number, @User('id') user) {
    return this.mainPageService.deleteOne(id, user)
  }

  @Post(':id/bookmark')
  @UseGuards(new AuthGuard())
  bookmarkProduct(@Param('id') id: number, @User('id') user : number){
    return this.mainPageService.bookmark(id, user)
  }

  @Delete(':id/bookmark')
  @UseGuards(new AuthGuard())
  unBookmarkProduct(@Param('id') id: number, @User('id') user : number){
    return this.mainPageService.unBookmark(id, user)
  }

  @Post(':id/upvote')
  @UseGuards(new AuthGuard())
  upvoteProduct(@Param('id') id: number, @User('id') user: number) {
    return this.mainPageService.upvote(id, user)
  }

  @Post(':id/downVote')
  @UseGuards(new AuthGuard())
  downVoteProduct(@Param('id') id: number, @User('id') user: number){
    return this.mainPageService.downVote(id, user)
  }

}