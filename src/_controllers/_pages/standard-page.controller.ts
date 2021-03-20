export class StandardPageController {
  constructor(private readonly page: any) {}

  public static init(page: any) {
    return new StandardPageController(page).getPage();
  }

  public getPage(): any {
    this.attachTemplateFunctions();
    return this.page;
  }

  private attachTemplateFunctions(): void {
    this.page.pageComponents.forEach((component: any) => {
      component.callTemplate = () => {
        return `components/${component.componentTemplate}`;
      };
    });
  }
}
