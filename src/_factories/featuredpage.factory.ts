
import { PageFactory } from './page.factory';


export class FeaturedpageFactory extends PageFactory {
  constructor(private contentItems: any) {
    super();
    console.log('FeaturedpageFactory constructor called!');
  }

  public init() {

    const allGood = true;

    return new Promise((resolve, reject) => {

      if (allGood) {
        resolve(this.contentItems);
      } else {
        reject(console.log('Not so good.'))
      }

    })
  }

}
