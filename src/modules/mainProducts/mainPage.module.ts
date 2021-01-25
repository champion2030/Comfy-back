import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainPageService } from './services/mainPage.service';
import { MainPageController } from './controllers/mainPage.controller';
import { MainPageEntity } from './shemes/mainPage.entity';
import { UserEntity } from '../users/shemes/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainPageEntity, UserEntity])],
  providers: [MainPageService],
  controllers: [MainPageController],
})

export class MainPageModule{}
