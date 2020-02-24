
import { PageFactory } from './page.factory';

export class FeaturedpageFactory extends PageFactory {
  constructor() {
    super();
    console.log('FeaturedpageFactory constructor called!');
  }

  public init(): void {
    return console.log('Init called!')
  }

}