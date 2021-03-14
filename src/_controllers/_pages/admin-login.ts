export class AdminLoginController {
  constructor(private readonly adminLogin: any) {}

  public static init(adminLogin: any) {
    return new AdminLoginController(adminLogin).getPage();
  }

  public getPage(): any {
    this.attachTemplateFunctions();
    return this.adminLogin;
  }

  private attachTemplateFunctions(): void {
    this.adminLogin.pageComponents.forEach(component => {
      console.log(component);
      component.callTemplate = () => {
        return `components/${component.componentTemplate}`;
      };
    });
  }
}
