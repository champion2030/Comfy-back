import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MainPageModule } from './modules/mainProducts/mainPage.module';


@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, MainPageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
