import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainPageEntity } from '../../mainProducts/shemes/mainPage.entity';
import { CreateComputersCharacteristicsDto } from '../dto/create-computersCharacteristics.dto';
import { ComputersCharacteristicsEntity } from '../shemes/computersCharacteristics.entity';

@Injectable()
export class ComputersCharacteristicsService {
  constructor(
    @InjectRepository(ComputersCharacteristicsEntity) private computerCharacteristicsRepository: Repository<ComputersCharacteristicsEntity>,
    @InjectRepository(MainPageEntity) private mainPageRepository: Repository<MainPageEntity>,
  ) {
  }

  private toResponseObject(characteristics: ComputersCharacteristicsEntity) {
    const responseObject: any = characteristics;
    return responseObject;
  }

  async showByProduct(id: number) {
    const characteristics = await this.computerCharacteristicsRepository.find({
      where: { product: { id } }
    });
    return characteristics.map(characteristic => this.toResponseObject(characteristic));
  }

  async create(productId: number, data: CreateComputersCharacteristicsDto) {
    const product = await this.mainPageRepository.findOne({ where: { id: productId } });
    const characteristics = await this.computerCharacteristicsRepository.create({ ...data, product });
    await this.computerCharacteristicsRepository.save(characteristics);
    return this.toResponseObject(characteristics);
  }

  async destroy(id: number) {
    const characteristics = await this.computerCharacteristicsRepository.findOne({
      where: { product: { id } },
    });
    await this.computerCharacteristicsRepository.remove(characteristics);
    return this.toResponseObject(characteristics);
  }
}
