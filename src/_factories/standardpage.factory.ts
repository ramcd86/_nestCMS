export class StandardpageFactory {
  constructor(private contentItems: any) {
    console.log('StandardpageFactory constructor called!');
  }

  public init() {

    const allGood = true;

    return new Promise((resolve, reject) => {

      if (allGood) {
        resolve(this.contentItems);
      } else {
        reject(console.log('Not so good.'));
      }

    });
  }

}
