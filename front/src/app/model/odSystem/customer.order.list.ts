import {Product} from "./product";

export class CustomerOrderList {
  customerOrderListId: number | undefined
  selectionTime: string | undefined;
  quantity: number;
  customerOrderId: number;
  productId: number;

  product: Product | undefined;

  constructor(productId: number, quantity: number, customerOrderId: number, selectionTime?: string, customerOrderListId?: number) {
    this.customerOrderListId = customerOrderListId;
    this.selectionTime = selectionTime;
    this.quantity = quantity;
    this.customerOrderId = customerOrderId;
    this.productId = productId;
  }

  static fromJson(jsonCustomerOrderList: CustomerOrderList) {
    let customerOrderList = new CustomerOrderList(jsonCustomerOrderList.productId, jsonCustomerOrderList.quantity, jsonCustomerOrderList.customerOrderId, jsonCustomerOrderList.selectionTime, jsonCustomerOrderList.customerOrderListId);

    customerOrderList.product = Product.fromJson(jsonCustomerOrderList.product!);

    return customerOrderList;
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
