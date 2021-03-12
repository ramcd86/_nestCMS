import { HomePageController } from "src/_controllers/_pages/home-page.controller";
import { StandardPageController } from "src/_controllers/_pages/standard-page.controller";
import { SuccessPageController } from "src/_controllers/_pages/success-page.controller";

export enum Pages {
  error_page = "pages/error_page.hbs",
  home_page = "pages/home_page.hbs",
  standard_page = "pages/standard_page.hbs",
  success_page = "pages/success_page.hbs"
}

export const PageControllers = {
  home_page: HomePageController,
  standard_page: StandardPageController,
  success_page: SuccessPageController
};

export enum Components {
  text_component = "components/text_component.hbs",
  form_component = "components/form_component.hbs"
}

export enum Partials {
  index = "partials/index.hbs"
}
