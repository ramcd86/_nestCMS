import { PageFactory } from './page.factory';

export class LandingpageFactory extends PageFactory {
  constructor() {
    super();
    console.log('LandingpageFactory constructor called!');
  }

  public init(): void {
    return console.log('Init called!')
  }

}