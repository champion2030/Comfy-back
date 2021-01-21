import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { MainPageService } from '../services/mainPage.service';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { MainPage } from '../shemes/mainPage.entity';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';

@Controller('main')
export class MainPageController {
  constructor(private mainPageService: MainPageService) {}

  @Get()
  findAll(){
    return this.mainPageService.findAll()
  }

  @Post()
  create(@Body() createMainPageDto: CreateMainPageDto){
        return this.mainPageService.create(createMainPageDto)
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.mainPageService.findById(id)
  }

  @Put(':id')
  updateOne(@Param('id') id: number, @Body() updateMainPageDto: Partial<UpdateMainPageDto>) {
    return this.mainPageService.updateOne(id, updateMainPageDto)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.mainPageService.deleteOne(id)
  }

}