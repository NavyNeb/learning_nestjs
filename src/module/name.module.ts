/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HelloController } from 'src/hello/hello.controller';
import { NameService } from 'src/services/name.service';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [
    NameService
  ],
})
export class NameModule {}
