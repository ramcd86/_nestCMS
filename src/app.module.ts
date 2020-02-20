import { Module } from '@nestjs/common';
import { AppController } from './_controllers/app.controller';
import { AppService } from './_services/app.service';
import { FileService } from './_services/file.service';

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [AppService,
  FileService],
})
export class AppModule {}
