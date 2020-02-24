export interface ISite {
  pages: IPageObject[];
}

export interface IPageObject {
  route: string;
  type: string;
  options: any;
  contentItems: IContentItems[];
}

export interface IContentItems {
  content: string;
}