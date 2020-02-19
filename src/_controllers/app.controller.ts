import { Controller, Get } from '@nestjs/common';
import { AppService } from '../_services/app.service';
import { FileService } from '../_services/file.service';
import { StandardPageController } from '../_factories/standardpage.factory';

@Controller()
export class AppController {

  public pageFactory: StandardPageController;

  constructor(
    private readonly appService: AppService
  ) {
    FileService.queryDb('test').then((response: IDatabaseQueryResolution) => {
      console.log(response.payload);
    }).catch((error: IDatabaseQueryResolution) => {
      console.log(error.payload);
    });

    this.pageFactory = new StandardPageController('test');

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
