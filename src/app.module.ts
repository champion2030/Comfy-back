import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { MainPageModule } from './modules/mainProducts/mainPage.module';
import { HttpErrorFilter } from './modules/mainProducts/exceptions/http-error.filter';
import { LoggingInterceptor } from './modules/mainProducts/exceptions/logging.interceptor';
import { CommentsModule } from './modules/comments/comments.module';


@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, MainPageModule, CommentsModule],
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

