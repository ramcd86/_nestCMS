// import { Controller, Get } from '@nestjs/common';

// @Controller()
export class StandardPageController {

  private pageObect: any;

  constructor(incomingPage) {
    this.pageObect = incomingPage;
  }

  // @Get(this.pageObject)
  exposeRoute(): string {
    return 'Yeah'
  }

}