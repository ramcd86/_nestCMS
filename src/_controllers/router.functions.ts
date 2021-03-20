import { Response, Request } from "express";
import { Pages, PageControllers } from "../_utilities/templates.enum";
import { Page, SiteRoot } from "../_interfaces/interfaces";

export function routeDataConstructor(
  res: Response,
  param: string,
  globalSiteData: SiteRoot | undefined
): any {
  try {
    let pageToLoad: Page;

    if (globalSiteData) {
      globalSiteData.pages.find((singlePage: Page) => {
        if (singlePage.pageSlug === param) {
          // @ts-ignore
          pageToLoad = PageControllers[singlePage.pageTemplate].init(
            singlePage
          );
        }

        if (pageToLoad && (res.statusCode === 200 || res.statusCode === 201)) {
          // @ts-ignore
          res.render(Pages[pageToLoad.pageTemplate], {
            pageComponents: pageToLoad.pageComponents
          });
        }
      });
    } else {
      res.render(Pages.error_page, {});
    }
  } catch {}
}
