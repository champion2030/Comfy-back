import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainPage } from '../shemes/mainPage.entity';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';

@Injectable()
export class MainPageService{
  constructor(
    @InjectRepository(MainPage) private mainPageRepository: Repository<MainPage>,
  ) {}

  public async findAll(){
    return await this.mainPageRepository.find()
  }

  public async create(createMainPageDto: CreateMainPageDto){
    return await this.mainPageRepository.save(createMainPageDto)
  }

  public async findById(id: number){
    return await this.mainPageRepository.findOne({where:{id}})
  }

  public async updateOne(id: number, updateMainPageDto: Partial<UpdateMainPageDto>) {
    await this.mainPageRepository.update({id}, updateMainPageDto)
    return this.mainPageRepository.findOne({id})
  }

  public async deleteOne(id: number){
    await this.mainPageRepository.delete({id})
    return {deleted: true}
  }

}
