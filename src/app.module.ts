import { Module } from "@nestjs/common";
import { AppController } from "./_controllers/app.controller";
import { AdminController } from "./_controllers/admin.controller";
import { AppService } from "./_services/app.service";
import { FileService } from "./_services/file.service";
import { PageFactory } from "./_factories/page.factory";
import { ContactpageFactory } from "./_factories/contactpage.factory";
import { FeaturedpageFactory } from "./_factories/featuredpage.factory";
import { LandingpageFactory } from "./_factories/landingpage.factory";
import { NewspageFactory } from "./_factories/newspage.factory";
import { StandardpageFactory } from "./_factories/standardpage.factory";

import { MainController } from "./_controllers/main.controller";

@Module({
  imports: [
    PageFactory,
    ContactpageFactory,
    FeaturedpageFactory,
    LandingpageFactory,
    NewspageFactory,
    StandardpageFactory
  ],
  controllers: [
    MainController,
    // AppController,
    AdminController
  ],
  providers: [AppService, FileService]
})
export class AppModule {}
