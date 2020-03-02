import { BlogpageFactory } from './blogpage.factory';
import { ContactpageFactory } from './contactpage.factory';
import { FeaturedpageFactory } from './featuredpage.factory';
import { LandingpageFactory } from './landingpage.factory';
import { NewspageFactory } from './newspage.factory';
import { StandardpageFactory } from './standardpage.factory';

import { ISitePageObject } from '../_interfaces/ISite.interface';

export class PageFactory {

  public static BlogFactory(routeItem: ISitePageObject): BlogpageFactory {
    return new BlogpageFactory(routeItem);
  }

  public static FeaturedFactory(routeItem: ISitePageObject): FeaturedpageFactory {
    return new FeaturedpageFactory(routeItem);
  }

  public static LandingFactory(routeItem: ISitePageObject): LandingpageFactory {
    return new LandingpageFactory(routeItem);
  }

  public static NewsFactory(routeItem: ISitePageObject): NewspageFactory {
    return new NewspageFactory(routeItem);
  }

  public static StandardFactory(routeItem: ISitePageObject): StandardpageFactory {
    return new StandardpageFactory(routeItem);
  }

  public static ContactFactory(routeItem: ISitePageObject): ContactpageFactory {
    return new ContactpageFactory(routeItem);
  }

}