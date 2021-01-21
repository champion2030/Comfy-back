import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MainPageModule } from './modules/mainProducts/mainPage.module';
import { HttpErrorFilter } from './modules/mainProducts/exceptions/http-error.filter';
import { LoggingInterceptor } from './modules/mainProducts/exceptions/logging.interceptor';


@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, MainPageModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule {}

