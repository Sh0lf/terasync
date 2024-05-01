export class ProductMenuList {
  productMenuListId: number;
  selectionTime: string;
  quantity: number;
  customerOrderId: number;
  productMenuId: number;

  constructor(productMenuListId: number, selectionTime: string, quantity: number, customerOrderId: number, productMenuId: number) {
    this.productMenuListId = productMenuListId;
    this.selectionTime = selectionTime;
    this.quantity = quantity;
    this.customerOrderId = customerOrderId;
    this.productMenuId = productMenuId;
  }

  static fromJson(jsonProductMenuList: ProductMenuList) {
    return new ProductMenuList(jsonProductMenuList.productMenuListId, jsonProductMenuList.selectionTime,
      jsonProductMenuList.quantity, jsonProductMenuList.customerOrderId, jsonProductMenuList.productMenuId);
  }
}

