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