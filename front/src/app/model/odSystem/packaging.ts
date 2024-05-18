export class Packaging {
  packagingId: number;
  packaging: string;

  constructor(packagingId: number, packaging: string) {
    this.packagingId = packagingId;
    this.packaging = packaging;
  }

  public static fromJson(json: Packaging): Packaging {
    return new Packaging(json.packagingId, json.packaging);
  }

  static initializePackagings(json: {packagings: Packaging[]}): Packaging[] {
    let packagings: Packaging[] = [];
    if (json.packagings) {
      for (let packaging of json.packagings) {
        packagings.push(Packaging.fromJson(packaging));
      }
    }
    return packagings;
  }
}
