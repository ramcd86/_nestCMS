import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from '../_services/app.service';
import { FileService } from '../_services/file.service';
import {
  ISite,
  ISiteContentItems,
  ISiteOptions,
  ISitePageObject,
  IRouteResponse,
} from '../_interfaces/ISite.interface';
import { IDatabaseQueryResolution } from '../_interfaces/IDatabaserQueryResolution.interface';
import { TPageObject } from '../_utilities/custom.types';
import { Log } from '../_utilities/constants.class';
import { PageFactory } from '../_factories/page.factory';

// @Todo Need to actually apply interfaces to everything in here.


@Controller()
export class AppController {


  private globalDataObject: ISite;

  /*
  * @Param construct page.
  */

  constructor() {

    this.initialiseDatabaseState();

  }

  /*
  * @Param Query DB for site object.
  */

  private initialiseDatabaseState(): void {

    FileService.queryDb('site').then((response: IDatabaseQueryResolution) => {

      this.globalDataObject = response.payload;

    }).catch((error: IDatabaseQueryResolution) => {

      Log(error.payload);

    });

  }

  /*
  * @Param Primary get route, given by ID.
  */

  @Get(':id')
  public returnRouteConfig(@Param() param: IRouteResponse, @Res() responseToSend: any): any {

    return this.routeConstructor(param, this.globalDataObject).then((factoryResponse: ISitePageObject) => {

      responseToSend.render(factoryResponse.options.template, {

        message: factoryResponse.contentItems[0].content,

      });

    }).catch((err: string) => {

      responseToSend.render('error.hbs', {

        message: err,

      });

    });

  }

  /*
  * @Param Does the business of actually constructing the page object to be sent back to the client side.
  */

  public routeConstructor(routeIdObject: IRouteResponse, globalDataObject: ISite): Promise<ISitePageObject | string> {

    let routeItem: ISitePageObject;

    let localFactory: TPageObject;

    return new Promise((resolve, reject) => {

      try {

        routeItem = globalDataObject.pages.find(pageObject => pageObject.route === routeIdObject.id);

        localFactory = this.factoryBuilder(routeItem);

        localFactory.init()

          .then((res: ISitePageObject) => {

            resolve(res);

          }).catch(() => {

          reject('404 Page Not Found.');

        });

      } catch (e) {

        console.log(e);

        reject('404 Page Not Found.');

      }

    });

  }

  /*
  * @Param Returns the appropriate page factory in an uninitialised state.
  */

  public factoryBuilder(routeItem: ISitePageObject): TPageObject {

    const factories = {
      'LANDING_PAGE': PageFactory.LandingFactory,
      'STANDARD_PAGE': PageFactory.StandardFactory,
      'FEATURED_PAGE': PageFactory.FeaturedFactory,
      'CONTACT_PAGE': PageFactory.ContactFactory,
      'NEWS_PAGE': PageFactory.NewsFactory,
      'BLOG_PAGE': PageFactory.BlogFactory,
    };

    return new factories[routeItem.type](routeItem);

  }

}
