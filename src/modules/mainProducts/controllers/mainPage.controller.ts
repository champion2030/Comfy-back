import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { MainPageService } from '../services/mainPage.service';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { MainPage } from '../shemes/mainPage.entity';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';

@Controller('main')
export class MainPageController {
  constructor(private mainPageService: MainPageService) {}

  @Post()
  create(@Body() createMainPageDto: CreateMainPageDto): Promise<MainPage>{
    const mainPage = new MainPage()
    mainPage.id = createMainPageDto.id
    mainPage.photo = createMainPageDto.photo
    mainPage.bought = createMainPageDto.bought
    mainPage.title = createMainPageDto.title
    mainPage.price = createMainPageDto.price
    return this.mainPageService.create(mainPage)
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) : Promise<MainPage>{
    const mainPage = await this.mainPageService.findById(id)
    if (mainPage === undefined){
      throw new NotFoundException('Dont have such product')
    }
    return mainPage
  }

  @Get()
  findAll(): Promise<MainPage[]>{
    return this.mainPageService.findAll()
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) : Promise<DeleteResult> {
    const mainPage = await this.mainPageService.findById(id)
    if (mainPage === undefined){
      throw new NotFoundException('Dont have such product')
    }
    return this.mainPageService.deleteOne(id)
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() updateMainPageDto: UpdateMainPageDto): Promise<MainPage>{
    const mainPage = await this.mainPageService.findById(id)
    if (mainPage === undefined){
      throw new NotFoundException('Dont have such product')
    }
    mainPage.id = updateMainPageDto.id
    mainPage.photo = updateMainPageDto.photo
    mainPage.bought = updateMainPageDto.bought
    mainPage.title = updateMainPageDto.title
    mainPage.price = updateMainPageDto.price
    return this.mainPageService.updateOne(id, mainPage)
  }
}