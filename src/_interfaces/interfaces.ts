export type ContentTypes = TextComponent;

export interface TextComponent {
  header: string;
  subHeader: string;
  paragraph: string;
}

export interface PageComponent {
  componentName: string;
  componentTemplate: string;
  content: TextComponent;
}

export interface Page {
  pageName: string;
  pageTemplate: string;
  pageSlug: string;
  pageComponents: PageComponent[];
}

export interface SiteRoot {
  pages: Page[];
}

export interface DatabaseQueryResolution {
  status: string;
  payload: SiteRoot | string;
}
