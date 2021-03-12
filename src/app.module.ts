import { Module } from "@nestjs/common";
import { AppService } from "./_services/app.service";
import { FileService } from "./_services/file.service";

import { MainController } from "./_controllers/main.controller";

@Module({
  imports: [],
  controllers: [MainController],
  providers: [AppService, FileService]
})
export class AppModule {}
