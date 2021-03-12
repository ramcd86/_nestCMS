import { Controller, Get, Param, Res } from "@nestjs/common";
import { Pages, PageControllers } from "../_utilities/templates.enum";
import { Response } from "express";
import { FileService } from "../_services/file.service";
import { Log } from "../_utilities/constants.class";

@Controller()
export class MainController {
  private globalSiteData: any;

  constructor() {
    this.initialiseDatabaseState();
  }

  private initialiseDatabaseState(): void {
    FileService.queryDb("mock-site")
      .then((response: any) => {
        this.globalSiteData = response.payload;
      })
      .catch((error: any) => {
        Log(error.payload);
      });
  }

  @Get("")
  public baseRouteFinder(@Res() res: Response) {
    this.routeDataConstructor(res, "home");
  }

  @Get(":id")
  public primaryRouteHandler(
    @Param() param: { id: string },
    @Res() res: Response
  ) {
    this.routeDataConstructor(res, param.id);
  }

  private routeDataConstructor(res: Response, param?: string): any {
    try {
      let selectedPageContentData:
        | {
            pageTemplate: string;
            pageComponents: unknown[];
          }
        | undefined;

      this.globalSiteData.pages.find(page => {
        if (page.pageSlug === param) {
          selectedPageContentData = PageControllers[page.pageTemplate].init(
            page
          );
        }

        if (selectedPageContentData && res.statusCode === 200) {
          res.render(Pages[selectedPageContentData.pageTemplate], {
            pageComponents: selectedPageContentData.pageComponents
          });
        }
      });
    } catch {
      res.render(Pages.error_page, {});
    }
  }
}
