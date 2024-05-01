export class ProductMenuList {
  productMenuListId: number | undefined;
  selectionTime: string;
  quantity: number;
  customerOrderId: number;
  productMenuId: number;

  constructor(selectionTime: string, quantity: number, customerOrderId: number, productMenuId: number, productMenuListId?: number | undefined) {
    this.productMenuListId = productMenuListId;
    this.selectionTime = selectionTime;
    this.quantity = quantity;
    this.customerOrderId = customerOrderId;
    this.productMenuId = productMenuId;
  }

  static fromJson(jsonProductMenuList: ProductMenuList) {
    return new ProductMenuList(jsonProductMenuList.selectionTime, jsonProductMenuList.quantity,
      jsonProductMenuList.customerOrderId, jsonProductMenuList.productMenuId, jsonProductMenuList.productMenuListId);
  }

  static initializeProductMenuLists(json: {productMenuLists: ProductMenuList[]}) {
    let productMenuLists: ProductMenuList[] = [];
    if (json.productMenuLists) {
      for (let productMenuList of json.productMenuLists) {
        productMenuLists.push(ProductMenuList.fromJson(productMenuList));
      }
    }
    return productMenuLists;
  }
}

