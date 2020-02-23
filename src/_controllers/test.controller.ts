import { Controller, Get } from '@nestjs/common';

let capturedArgument: string = "";

@Controller()
export class TestController {

  // public pageFactory: StandardPageController;

  public capturedArgument: string;

  constructor(
  ) {
    this.capturedArgument = capturedArgument;
    console.log(capturedArgument);
  }

  static captureArgument(arg: string): any {
    capturedArgument = arg;
  }

  @Get('test')
  getHello(): string {
    return this.capturedArgument;
  }
}
