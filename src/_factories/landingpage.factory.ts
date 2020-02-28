import { PageFactory } from './page.factory';

export class LandingpageFactory extends PageFactory {
  constructor(private contentItems: any) {
    super();
    console.log('LandingpageFactory constructor called!');
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
