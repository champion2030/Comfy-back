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
    const product = await this.mainPageRepository.findOne({where:{id}})
    if (!product){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return product
  }

  public async updateOne(id: number, updateMainPageDto: Partial<UpdateMainPageDto>) {
    let product = await this.mainPageRepository.findOne({where:{id}})
    if (!product){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    await this.mainPageRepository.update({id}, updateMainPageDto)
    product = await this.mainPageRepository.findOne({where: {id}})
    return product
  }

  public async deleteOne(id: number){
    const product = await this.mainPageRepository.findOne({where:{id}})
    if (!product){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    await this.mainPageRepository.delete({id})
    return product
  }

}
