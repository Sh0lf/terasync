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

  static initializePackaging(jsonCustomerOrder: {packaging: Packaging | undefined}): Packaging | undefined {
    let packaging: Packaging | undefined;
    if(jsonCustomerOrder.packaging != undefined) {
      packaging = Packaging.fromJson(jsonCustomerOrder.packaging);
    }
    return packaging;
  }
}
