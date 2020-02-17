import { Controller, Get } from '@nestjs/common';
import { AppService } from '../_services/app.service';
import { FileService } from '../_services/file.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {
    FileService.queryDb('test').then((response: IDatabaseQueryResolution) => {
      console.log(response.payload);
    }).catch((error: IDatabaseQueryResolution) => {
      console.log(error.payload);
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
