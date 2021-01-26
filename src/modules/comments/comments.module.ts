import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './shemes/comments.entity';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { MainPageEntity } from '../mainProducts/shemes/mainPage.entity';
import { UserEntity } from '../users/shemes/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([MainPageEntity, UserEntity, CommentsEntity])],
  providers: [CommentsService],
  controllers: [CommentsController],
})

export class CommentsModule{}
