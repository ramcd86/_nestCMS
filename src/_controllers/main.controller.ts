import { PageFactory } from "./../_factories/page.factory";
import {
  Controller,
  Get,
  Param,
  Res,
  Redirect,
  HttpStatus,
  Query
} from "@nestjs/common";
import { Pages, Partials, Components } from "../_utilities/templates.enum";
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
        console.log(response.payload);
        this.globalSiteData = response.payload;
      })
      .catch((error: any) => {
        Log(error.payload);
      });
  }

  @Get("")
  public baseRouteFinder(@Res() res: Response) {
    const selectedPageContentData: {
      pageTemplate: string;
      pageComponents: unknown[];
    } = this.routeDataConstructor();

    if (!selectedPageContentData) {
      res.render(Pages.error_page, {});
    }

    if (selectedPageContentData && res.statusCode === 200) {
      res.render(Pages[selectedPageContentData.pageTemplate], {
        pageComponents: selectedPageContentData.pageComponents
      });
    }
  }

  @Get(":id")
  public primaryRouteHandler(
    @Param() param: { id: string },
    @Res() res: Response
  ) {
    console.log(param);

    const selectedPageContentData: {
      pageTemplate: string;
      pageComponents: unknown[];
    } = this.routeDataConstructor(param.id);

    if (!selectedPageContentData) {
      res.render(Pages.error_page, {});
    }

    if (selectedPageContentData && res.statusCode === 200) {
      res.render(Pages[selectedPageContentData.pageTemplate], {
        pageComponents: selectedPageContentData.pageComponents,
        data: {
          test: () => {
            return "components_text_component";
          }
        }
      });
    }
  }

  private routeDataConstructor(param?: string): any {
    try {
      if (!param) {
        return "home_page";
      }
      return this.globalSiteData.pages.find(page => {
        if (page.pageSlug === param) {
          page.pageComponents.forEach(component => {
            component.templateFunction = () => {
              return `components_${component.componentTemplate}`;
            };
          });
          console.log(page.pageComponents);
          return page;
        }
      });
    } catch {
      return undefined;
    }
  }
}
