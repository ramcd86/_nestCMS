import { PageFactory } from './page.factory';

export class BlogpageFactory extends PageFactory {
  constructor(private contentItems: any) {
    super();
    console.log('BlogpageFactory constructor called!');
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
