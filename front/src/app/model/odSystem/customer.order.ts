import {CustomerOrderList} from "./customer.order.list";
import {CustomerOrderService} from "../../service/odSystem/customer-order.service";
import {ProductMenuList} from "./product.menu.list";

export class CustomerOrder {
  customerOrderId: number;
  creationTime: string;
  minTemp: number;
  maxTemp: number;
  deliveryTime: string;
  statusId: string;
  packagingId: number;
  customerId: number;
  businessId: number;
  deliveryServiceId: number;
  deliveryPersonId: number;

  customerOrderLists: CustomerOrderList[] = [];
  productMenuLists: ProductMenuList[] = [];


  constructor(customerOrderId: number, creationTime: string, minTemp: number, maxTemp: number,
              deliveryTime: string, statusId: string, packagingId: number, customerId: number,
              businessId: number, deliveryServiceId: number, deliveryPersonId: number) {
    this.customerOrderId = customerOrderId;
    this.creationTime = creationTime;
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
    this.deliveryTime = deliveryTime;
    this.statusId = statusId;
    this.packagingId = packagingId;
    this.customerId = customerId;
    this.businessId = businessId;
    this.deliveryServiceId = deliveryServiceId;
    this.deliveryPersonId = deliveryPersonId;
  }

  static fromJson(jsonCustomerOrder: CustomerOrder) {
    let customerOrder: CustomerOrder = new CustomerOrder(jsonCustomerOrder.customerOrderId, jsonCustomerOrder.creationTime,
      jsonCustomerOrder.minTemp, jsonCustomerOrder.maxTemp, jsonCustomerOrder.deliveryTime,
      jsonCustomerOrder.statusId, jsonCustomerOrder.packagingId, jsonCustomerOrder.customerId,
      jsonCustomerOrder.businessId, jsonCustomerOrder.deliveryServiceId, jsonCustomerOrder.deliveryPersonId)

    this.initializeCustomerOrderLists(jsonCustomerOrder, customerOrder);
    this.initializeProductMenuLists(jsonCustomerOrder, customerOrder);

    return customerOrder;
  }

  private static initializeCustomerOrderLists(jsonCustomerOrder: CustomerOrder, customerOrder: CustomerOrder) {
    if(jsonCustomerOrder.customerOrderLists != undefined) {
      for(let customerOrderList of jsonCustomerOrder.customerOrderLists) {
        customerOrder.customerOrderLists.push(CustomerOrderList.fromJson(customerOrderList));
      }
    }
  }

  private static initializeProductMenuLists(jsonCustomerOrder: CustomerOrder, customerOrder: CustomerOrder) {
    if(jsonCustomerOrder.productMenuLists != undefined) {
      for(let productMenuList of jsonCustomerOrder.productMenuLists) {
        customerOrder.productMenuLists.push(ProductMenuList.fromJson(productMenuList));
      }
    }
  }
}
