import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from '../_services/app.service';
import { FileService } from '../_services/file.service';
import { ISite } from '../_interfaces/ISite.interface';
import { IDatabaseQueryResolution } from '../_interfaces/IDatabaserQueryResolution.interface';

@Controller()
export class AppController {

  public globalDataObject: ISite;

  constructor(
    private readonly appService: AppService
  ) {
    FileService.queryDb('site').then((response: IDatabaseQueryResolution) => {
      this.globalDataObject = response.payload;
      console.log(response.payload);
    }).catch((error: IDatabaseQueryResolution) => {
      console.log(error.payload);
    });
  }

  @Get()
  @Render('home.hbs')
  returnIndex() {
    return {
      message: 'Hello World!'
    }
  }

  @Get('r/:id')
  returnRouteConfig(@Param() param: any): any {
    const dataRoute = this.globalDataObject.find(r => r.route === param.id);
    console.log(dataRoute);
    return this.appService.getHello();
  }
}
