import {CustomerOrder} from "../../../../model/odSystem/customer.order";

export class CustomerOrderElement {
  customerOrder: CustomerOrder;
  class: string;

  constructor(customerOrder: CustomerOrder) {
    this.customerOrder = customerOrder;
    this.class = "customer-order-div";
  }

  setClicked() {
    this.class = "customer-order-div-clicked";
  }

  setUnclicked() {
    this.class = "customer-order-div";
  }
}
