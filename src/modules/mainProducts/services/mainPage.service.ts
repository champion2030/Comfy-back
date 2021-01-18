import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { MainPage } from '../shemes/mainPage.entity';
import { CreateMainPageDto } from '../dto/create-mainPage.dto';
import { UpdateMainPageDto } from '../dto/update-mainPage.dto';

@Injectable()
export class MainPageService{
  constructor(
    @InjectRepository(MainPage) private readonly mainPageRepository: Repository<MainPage>,
  ) {}

  public async findAll(): Promise<MainPage[]>{
    return this.mainPageRepository.find()
  }

  public async findById(id: number): Promise<MainPage | null>{
    return await this.mainPageRepository.findOneOrFail(id)
  }

  public async create(createMainPageDto: CreateMainPageDto): Promise<MainPage>{
    return await this.mainPageRepository.save(createMainPageDto)
  }

  public async deleteOne(id: number): Promise<DeleteResult>{
    return await this.mainPageRepository.delete(id)
  }

  public async updateOne(id: number, updateMainPageDto: UpdateMainPageDto): Promise<MainPage | null> {
    const mainPage = await this.mainPageRepository.findOneOrFail(id)
    if (!mainPage.id){
      throw new NotFoundException("Don't have such product")
    }
    await this.mainPageRepository.update(id, updateMainPageDto)
    return this.mainPageRepository.findOne(id)
  }
}
