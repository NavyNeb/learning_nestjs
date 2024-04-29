import { NameModule } from './module/name.module';
import { NameService } from './services/name.service';
import { APP_FILTER } from '@nestjs/core';
import { InvalidNameFormatExceptionFilter } from './exceptions/exception.filter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { MissingNameExceptionFilterFilter } from './exceptions/missing-name-exception-filter.filter';

@Module({
  imports: [
        NameModule, ],
  controllers: [AppController],
  providers: [
    InvalidNameFormatExceptionFilter,
    MissingNameExceptionFilterFilter,
    AppService,
  ],
})
export class AppModule {}
