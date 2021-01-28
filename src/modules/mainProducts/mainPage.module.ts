import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainPageService } from './services/mainPage.service';
import { MainPageController } from './controllers/mainPage.controller';
import { MainPageEntity } from './shemes/mainPage.entity';
import { UserEntity } from '../users/shemes/user.entity';
import { CommentsEntity } from '../comments/shemes/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainPageEntity, UserEntity, CommentsEntity])],
  providers: [MainPageService],
  controllers: [MainPageController],
})

export class MainPageModule{}
