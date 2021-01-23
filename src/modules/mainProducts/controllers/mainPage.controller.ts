import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query, UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { MainPageService } from '../services/mainPage.service';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { MainPage } from '../shemes/mainPage.entity';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';
import { ValidationPipe } from '../exceptions/validation.pipe';
import { AuthGuard } from '../../auth/auth.guard';
import { User } from '../../users/decorator/user.decorator';

@Controller('comfy/main')
export class MainPageController {
  private logger = new Logger('ProductController')
  constructor(private mainPageService: MainPageService) {}

  @Get()
  findAll(){
    return this.mainPageService.findAll()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createMainPageDto: CreateMainPageDto){
    this.logger.log(JSON.stringify(createMainPageDto))

    return this.mainPageService.create(createMainPageDto)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.mainPageService.findById(id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateOne(@Param('id') id: number, @Body() updateMainPageDto: Partial<UpdateMainPageDto>) {
    this.logger.log(JSON.stringify(updateMainPageDto))
    return this.mainPageService.updateOne(id, updateMainPageDto)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.mainPageService.deleteOne(id)
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