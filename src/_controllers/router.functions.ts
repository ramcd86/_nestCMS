import { Response, Request } from "express";
import { Pages, PageControllers } from "../_utilities/templates.enum";

export function routeDataConstructor(
  res: Response,
  param: string,
  globalSiteData: any
): any {
  try {
    let selectedPageContentData:
      | {
          pageTemplate: string;
          pageComponents: unknown[];
        }
      | undefined;

    globalSiteData.pages.find(page => {
      if (page.pageSlug === param) {
        selectedPageContentData = PageControllers[page.pageTemplate].init(page);
      }

      if (
        selectedPageContentData &&
        (res.statusCode === 200 || res.statusCode === 201)
      ) {
        res.render(Pages[selectedPageContentData.pageTemplate], {
          pageComponents: selectedPageContentData.pageComponents
        });
      }
    });
  } catch {
    res.render(Pages.error_page, {});
  }
}
