import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainPageEntity } from '../mainProducts/shemes/mainPage.entity';
import { ComputersCharacteristicsController } from './controllers/computersCharacteristics.controller';
import { ComputersCharacteristicsEntity } from './shemes/computersCharacteristics.entity';
import { ComputersCharacteristicsService } from './services/computersCharacteristics.service';


@Module({
  imports: [TypeOrmModule.forFeature([MainPageEntity, ComputersCharacteristicsEntity])],
  providers: [ComputersCharacteristicsService],
  controllers: [ComputersCharacteristicsController],
})

export class ComputersCharacteristicsModule{}
