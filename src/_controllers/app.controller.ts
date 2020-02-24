import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from '../_services/app.service';
import { FileService } from '../_services/file.service';
import { ISite, IPageObject } from '../_interfaces/ISite.interface';
import { IDatabaseQueryResolution } from '../_interfaces/IDatabaserQueryResolution.interface';
import { LandingpageFactory } from '../_factories/landingpage.factory';
import { StandardpageFactory } from '../_factories/standardpage.factory';
import { FeaturedpageFactory } from '../_factories/featuredpage.factory';
import { ContactpageFactory } from '../_factories/contactpage.factory';
import { NewspageFactory } from '../_factories/newspage.factory';
import { BlogpageFactory } from '../_factories/blogpage.factory';

@Controller()
export class AppController {

  private globalDataObject: ISite;
  private readonly factoryBuilder: any;

  constructor(
    private readonly appService: AppService
  ) {

    FileService.queryDb('site').then((response: IDatabaseQueryResolution) => {
      this.globalDataObject = response.payload;
      console.log(response.payload);
    }).catch((error: IDatabaseQueryResolution) => {
      console.log(error.payload);
    });

    this.factoryBuilder = {
      "LANDING_PAGE": LandingpageFactory,
      "STANDARD_PAGE": StandardpageFactory,
      "FEATURED_PAGE": FeaturedpageFactory,
      "CONTACT_PAGE": ContactpageFactory,
      "NEWS_PAGE": NewspageFactory,
      "BLOG_PAGE": BlogpageFactory
    };
  }

  @Get()
  @Render('home.hbs')
  returnIndex() {
    return {
      message: 'Hello World!'
    }
  }

  @Get(':id')
  returnRouteConfig(@Param() param: any): any {
    const routeItem: any = this.globalDataObject.pages.find(pageObject => pageObject.route === param.id) || [];
    // const
    const localFactory = new this.factoryBuilder[routeItem.type]();
    localFactory.init();
    console.log(routeItem);

    // const dataRoute = this.globalDataObject.find(r => r.route === param.id);
    // console.log(dataRoute);
    return this.appService.getHello();
  }



}
