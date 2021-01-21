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
  Query,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { MainPageService } from '../services/mainPage.service';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { MainPage } from '../shemes/mainPage.entity';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';
import { ValidationPipe } from '../exceptions/validation.pipe';

@Controller('main')
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
  findOneById(@Param('id') id: number) {
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

}