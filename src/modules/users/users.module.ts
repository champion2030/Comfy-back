import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UserEntity } from './shemes/user.entity';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule{}
