import { Controller, Get, Param, Res, Post, Body, Headers } from '@nestjs/common';
import { AppService } from '../_services/app.service';
import { FileService } from '../_services/file.service';
import { ISite, ISiteContentItems,ISiteOptions, ISitePageObject, IRouteResponse } from '../_interfaces/ISite.interface';
import { IDatabaseQueryResolution } from '../_interfaces/IDatabaserQueryResolution.interface';
import { LandingpageFactory } from '../_factories/landingpage.factory';
import { StandardpageFactory } from '../_factories/standardpage.factory';
import { FeaturedpageFactory } from '../_factories/featuredpage.factory';
import { ContactpageFactory } from '../_factories/contactpage.factory';
import { NewspageFactory } from '../_factories/newspage.factory';
import { BlogpageFactory } from '../_factories/blogpage.factory';
import { Log } from './../_utilities/constants.class';

// @Todo Need to actually apply interfaces to everything in here.



@Controller('corepanel')
export class AdminController {

  private globalDataObject: ISite;

  constructor() {

    this.initialiseDatabaseState();

  }

  private initialiseDatabaseState(): void {
    FileService.queryDb('site').then((response: IDatabaseQueryResolution) => {
      this.globalDataObject = response.payload;
    }).catch((error: IDatabaseQueryResolution) => {
        Log(error.payload);
    });
  }


  @Get()
  public serveCorePanelAdmin(@Res() responseToSend: any) {
      responseToSend.render('admin.hbs');
  }


  @Post('access')
  public getDb(@Body() body: any, @Headers() headers, @Res() responseToSend: any) {

    console.log(body);
    console.log(headers.ye)

    responseToSend.render('admin.hbs');

  }


}
