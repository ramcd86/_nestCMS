import { HomePageController } from "src/_controllers/_pages/home-page.controller";
import { StandardPageController } from "src/_controllers/_pages/standard-page.controller";

export enum Pages {
  error_page = "pages/error_page.hbs",
  home_page = "pages/home_page.hbs",
  standard_page = "pages/standard_page.hbs"
}

export const PageControllers = {
  home_page: HomePageController,
  standard_page: StandardPageController
};

export enum Components {
  text_component = "components/text_component.hbs"
}

export enum Partials {
  index = "partials/index.hbs"
}
