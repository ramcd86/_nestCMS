import { PageFactory } from './page.factory';

export class ContactpageFactory extends PageFactory {
  constructor() {
    super();
    console.log('ContactpageFactory constructor called!');
  }

  public init(): void {
    return console.log('Init called!')
  }

}