export class ProductList {
  productListId: number | undefined;
  quantity: number;
  productId: number;
  productMenuId: number;

  constructor(quantity: number, productId: number, productMenuId: number, productListId?: number) {
    this.productListId = productListId;
    this.quantity = quantity;
    this.productId = productId;
    this.productMenuId = productMenuId;
  }

  public static fromJson(json: ProductList): ProductList {
    return new ProductList(json.quantity, json.productId, json.productMenuId, json.productListId);
  }

  public static initializeProductLists(json: {productLists: ProductList[]}): ProductList[] {
    let productLists: ProductList[] = [];
    if (json.productLists) {
      for (let product of json.productLists) {
        productLists.push(ProductList.fromJson(product));
      }
    }
    return productLists;
  }
}
