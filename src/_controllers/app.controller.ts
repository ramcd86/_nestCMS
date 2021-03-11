import {
  StandardpageFactory
} from './../_factories/standardpage.factory';
import {
  NewspageFactory
} from './../_factories/newspage.factory';
import {
  LandingpageFactory
} from './../_factories/landingpage.factory';
import {
  FeaturedpageFactory
} from './../_factories/featuredpage.factory';
import {
  ContactpageFactory
} from './../_factories/contactpage.factory';
import { HomepageFactory } from './../_factories/homepage.factory';
import { ErrorpageFactory } from './../_factories/errorpage.factory'
import {
  BlogpageFactory
} from './../_factories/blogpage.factory';

import {
  TPageObject
} from './../_utilities/custom.types';
import {
  Controller,
  Get,
  Param,
  Res,
  Redirect
} from '@nestjs/common';
import {
  AppService
} from '../_services/app.service';
import {
  FileService
} from '../_services/file.service';
import {
  ISite,
  ISiteContentItems,
  ISiteOptions,
  ISitePageObject,
  IRouteResponse,
  IRouteObject,
} from '../_interfaces/ISite.interface';
import {
  IDatabaseQueryResolution
} from '../_interfaces/IDatabaserQueryResolution.interface';
import {
  Log
} from '../_utilities/constants.class';


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
   * @Param Return home page.
   * Could this be done better?
   */

  @Get('')
  public homeRouteProvider(@Res() responseToSend: any): any {
    // param.id = 'home';
    this.routeConstructor({ id: 'home' }, this.globalDataObject).then((factoryResponse: ISitePageObject) => {
      return responseToSend.render(factoryResponse.options.template, {
        pageData: {
          routes: this.getPageProps("GET_ROUTES")
        },
        message: factoryResponse.contentItems[0].content,
      });
    }).catch((err: string) => {
      return responseToSend.render('error.hbs', {
        pageData: [],
        message: err,
      });
    });

  }

  /*
   * @Param Primary get route, given by ID.
   */

  @Get(':id')
  public customeRouteProvider(@Param() param: IRouteResponse, @Res() responseToSend: any): any {

    return this.routeConstructor(param, this.globalDataObject).then((factoryResponse: ISitePageObject) => {
      responseToSend.render(factoryResponse.options.template, {
        pageData: {
          routes: this.getPageProps("GET_ROUTES")
        },
        message: factoryResponse.contentItems[0].content,
      });
    }).catch((err: string) => {
      responseToSend.render('error.hbs', {
        pageData: [],
        message: err
      });
    });

  }
  


  public getPageProps(command: string): string[] {

    const commandSet = {
      "GET_ROUTES": () => {
        let routes: IRouteObject[] = [];
        this.globalDataObject.pages.forEach((page) => {
          if (page.route.routeShown) {
            routes.push(page.route);
          }
        })
        return routes;
      }
    }

    return commandSet[command]();

  }


  /*
   * @Param Does the business of actually constructing the page object to be sent back to the client side.
   */

  public routeConstructor(routeIdObject: IRouteResponse, globalDataObject: ISite): Promise < ISitePageObject | string > {

    let routeItem: ISitePageObject;
    let localFactory: TPageObject;

    return new Promise((resolve, reject) => {

      routeItem = globalDataObject.pages.find(pageObject => pageObject.route.routeActual === routeIdObject.id);
      localFactory = this.factoryBuilder(routeItem);

      if (localFactory) {
        localFactory.init()
          .then((res: ISitePageObject) => {
            resolve(res);
          }).catch(() => {
            reject('404 Page Not Found.');
          });
      } else {
        reject('404 Page Not Found.');
      }
    });

  }

  /*
   * @Param Returns the appropriate page factory in an uninitialised state.
   */

  public factoryBuilder(routeItem: ISitePageObject): TPageObject {

    if (!routeItem) {
      routeItem = this.globalDataObject.errorPage;
    }
  
    const factories = {
      'LANDING_PAGE': LandingpageFactory,
      'STANDARD_PAGE': StandardpageFactory,
      'FEATURED_PAGE': FeaturedpageFactory,
      'CONTACT_PAGE': ContactpageFactory,
      'NEWS_PAGE': NewspageFactory,
      'BLOG_PAGE': BlogpageFactory,
      'HOME_PAGE': HomepageFactory,
      'ERROR_PAGE': ErrorpageFactory
    };

    return new factories[routeItem.type](routeItem);

  }

}