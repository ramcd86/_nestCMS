import { Module } from "@nestjs/common";
import { AppService } from "./_services/app.service";
import { FileService } from "./_services/file.service";

import { Router } from "./_controllers/router";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [Router],
  providers: [AppService, FileService]
})
export class AppModule {}
