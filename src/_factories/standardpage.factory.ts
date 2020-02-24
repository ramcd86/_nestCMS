import { PageFactory } from './page.factory';

export class StandardpageFactory extends PageFactory {
  constructor() {
    super();
    console.log('StandardpageFactory constructor called!');
  }

  public init(): void {
    return console.log('Init called!')
  }

}