import { LandingpageFactory } from '../_factories/landingpage.factory';
import { StandardpageFactory } from '../_factories/standardpage.factory';
import { FeaturedpageFactory } from '../_factories/featuredpage.factory';
import { ContactpageFactory } from '../_factories/contactpage.factory';
import { NewspageFactory } from '../_factories/newspage.factory';
import { BlogpageFactory } from '../_factories/blogpage.factory';

export interface ISite {
  pages: ISitePageObject[];
}

export interface ISitePageObject {
  route: string;
  type: string;
  options: ISiteOptions;
  contentItems: ISiteContentItems[];
}

export interface ISiteContentItems {
  content: string;
}

export interface ISiteOptions {
  template: string;
}

export interface IRouteResponse {
  id: string;
}

// export interface IFactoryBuilder {
//   "LANDING_PAGE": LandingpageFactory();
//   "STANDARD_PAGE": StandardpageFactory;
//   "FEATURED_PAGE": FeaturedpageFactory;
//   "CONTACT_PAGE": ContactpageFactory;
//   "NEWS_PAGE": NewspageFactory;
//   "BLOG_PAGE": BlogpageFactory;
// }