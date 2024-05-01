export class CustomerOrderList {
  customerOrderListId: number | undefined
  selectionTime: string;
  quantity: number;
  customerOrderId: number;
  productId: number;

  constructor(selectionTime: string, quantity: number, customerOrderId: number, productId: number, customerOrderListId?: number) {
    this.customerOrderListId = customerOrderListId;
    this.selectionTime = selectionTime;
    this.quantity = quantity;
    this.customerOrderId = customerOrderId;
    this.productId = productId;
  }

  static fromJson(jsonCustomerOrderList: CustomerOrderList) {
    return new CustomerOrderList(jsonCustomerOrderList.selectionTime, jsonCustomerOrderList.quantity,
      jsonCustomerOrderList.customerOrderId, jsonCustomerOrderList.productId,
      jsonCustomerOrderList.customerOrderListId);
  }

  static initializeCustomerOrderLists(json: {customerOrderLists: CustomerOrderList[]}) {
    let customerOrderLists: CustomerOrderList[] = [];
    if (json.customerOrderLists) {
      for (let customerOrderList of json.customerOrderLists) {
        customerOrderLists.push(CustomerOrderList.fromJson(customerOrderList));
      }
    }
    return customerOrderLists;
  }
}
