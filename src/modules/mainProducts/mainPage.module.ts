import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainPageService } from './services/mainPage.service';
import { MainPageController } from './controllers/mainPage.controller';
import { MainPage } from './shemes/mainPage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainPage])],
  providers: [MainPageService],
  controllers: [MainPageController],
})

export class MainPageModule{}
