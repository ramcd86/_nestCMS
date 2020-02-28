import { Controller, Get, Param, Render, Res } from '@nestjs/common';
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



    this.initialiseDatabaseState();

  }

  private initialiseDatabaseState() {
    FileService.queryDb('site').then((response: IDatabaseQueryResolution) => {
      this.globalDataObject = response.payload;
    }).catch((error: IDatabaseQueryResolution) => {
        throw error.payload;
    });
  }

  public routeConstructor(routeIdObject: any, globalDataObject: any) {
    let routeItem: any;
    let localFactory: any;
    const factoryBuilder = {
      "LANDING_PAGE": LandingpageFactory,
      "STANDARD_PAGE": StandardpageFactory,
      "FEATURED_PAGE": FeaturedpageFactory,
      "CONTACT_PAGE": ContactpageFactory,
      "NEWS_PAGE": NewspageFactory,
      "BLOG_PAGE": BlogpageFactory
    };
    return new Promise((resolve, reject) => {
      try {
        routeItem = globalDataObject.pages.find(pageObject => pageObject.route === routeIdObject.id) || [];
        localFactory = new factoryBuilder[routeItem.type](routeItem);
        localFactory.init().then((res: any) => {
          resolve(res);
        }).catch(() => {
          reject('404 Page Not Found.');
        });
      } catch (e) {
        console.log(e);
        reject('404 Page Not Found.');
      }
    })
  }


  @Get(':id')
  public returnRouteConfig(@Param() param: any, @Res() responseToSend: any): any {


    return this.routeConstructor(param, this.globalDataObject).then((factoryResponse: any) => {

      responseToSend.render(factoryResponse.options.template, {
          message: factoryResponse.contentItems[0].content
        });

    }).catch((err: string) => {

      responseToSend.render('error.hbs',{
        message: err
      });

    })



  }



}
