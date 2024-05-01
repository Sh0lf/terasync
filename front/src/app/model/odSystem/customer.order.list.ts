export class CustomerOrderList {
  customerOrderListId: number;
  selectionTime: string;
  quantity: number;
  customerOrderId: number;
  productId: number;

  constructor(customerOrderListId: number, selectionTime: string, quantity: number, customerOrderId: number, productId: number) {
    this.customerOrderListId = customerOrderListId;
    this.selectionTime = selectionTime;
    this.quantity = quantity;
    this.customerOrderId = customerOrderId;
    this.productId = productId;
  }

  static fromJson(jsonCustomerOrderList: CustomerOrderList) {
    return new CustomerOrderList(jsonCustomerOrderList.customerOrderListId, jsonCustomerOrderList.selectionTime,
      jsonCustomerOrderList.quantity, jsonCustomerOrderList.customerOrderId, jsonCustomerOrderList.productId);
  }
}
