export class HomePageController {
  constructor(private readonly homePage: any) {}

  public static init(homePage: any) {
    return new HomePageController(homePage).getPage();
  }

  public getPage(): any {
    this.attachTemplateFunctions();
    return this.homePage;
  }

  private attachTemplateFunctions(): void {
    this.homePage.pageComponents.forEach((component: any) => {
      console.log(component);
      component.callTemplate = () => {
        return `components/${component.componentTemplate}`;
      };
    });
  }
}
