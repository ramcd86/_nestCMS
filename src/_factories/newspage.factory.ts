import { PageFactory } from './page.factory';

export class NewspageFactory extends PageFactory {
  constructor() {
    super();
    console.log('NewspageFactory constructor called!');
  }

  public init(): void {
    return console.log('Init called!')
  }

}