import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from '../_services/app.service';
import { FileService } from '../_services/file.service';

@Controller()
export class AppController {

  public pageRoutes: any;

  constructor(
    private readonly appService: AppService
  ) {
    FileService.queryDb('test').then((response: IDatabaseQueryResolution) => {
      this.pageRoutes = response.payload;
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
    const dataRoute = this.pageRoutes.r.find(r => r.route === param.id);
    console.log(dataRoute);
    return this.appService.getHello();
  }
}
