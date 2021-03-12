export interface ISite {
  errorPage: ISitePageObject;
  pages: ISitePageObject[];
}

export interface ISitePageObject {
  route: IRouteObject;
  type: string;
  options: ISiteOptions;
  contentItems: ISiteContentItems[];
}

export interface IRouteObject {
  routeString: string;
  routeActual: string;
  routeShown: boolean;
  subRoutes: string[];
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
