import { Module } from '@nestjs/common';
import { AppController } from './_controllers/app.controller';
import { StandardPageController } from './_factories/standardpage.factory';
import { AppService } from './_services/app.service';
import { FileService } from './_services/file.service';

@Module({
  imports: [StandardPageController],
  controllers: [
    // StandardPageController,
    AppController
  ],
  providers: [AppService,
  FileService],
})
export class AppModule {}
