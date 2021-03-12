export class SuccessPageController {
  constructor(private readonly page: any) {}

  public static init(page: any) {
    return new SuccessPageController(page).getPage();
  }

  public getPage(): any {
    this.attachTemplateFunctions();
    return this.page;
  }

  private attachTemplateFunctions(): void {
    this.page.pageComponents.forEach(component => {
      component.callTemplate = () => {
        return `components/${component.componentTemplate}`;
      };
    });
  }
}
