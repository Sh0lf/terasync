import {CustomerOrderList} from "./customer.order.list";
import {MessageList} from "../message.list";
import {Status} from "./status";
import {Packaging} from "./packaging";
import {Address} from "./address";
import {Business} from "../user/business";
import {Customer} from "../user/customer";
import {DeliveryService} from "../user/delivery.service";
import {DeliveryPerson} from "../user/delivery.person";

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
  messageLists: MessageList[] = [];

  status!: Status | undefined
  packaging!: Packaging | undefined;
  address!: Address | undefined;

  business!: Business | undefined;
  customer!: Customer | undefined;
  deliveryService!: DeliveryService | undefined;
  deliveryPerson!: DeliveryPerson| undefined;

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

    customerOrder.customerOrderLists = CustomerOrderList.initializeCustomerOrderLists(jsonCustomerOrder);
    customerOrder.messageLists = MessageList.initializeMessageLists(jsonCustomerOrder);
    customerOrder.status = Status.initializeStatus(jsonCustomerOrder);
    customerOrder.packaging = Packaging.initializePackaging(jsonCustomerOrder);
    customerOrder.address = Address.initializeAddress(jsonCustomerOrder);

    return customerOrder;
  }

  static initializeCustomerOrders(jsonUser: {customerOrders: CustomerOrder[] | undefined}): CustomerOrder[] {
    let customerOrders: CustomerOrder[] = [];
    if(jsonUser.customerOrders != undefined) {
      for(let jsonCustomerOrder of jsonUser.customerOrders) {
        customerOrders.push(CustomerOrder.fromJson(jsonCustomerOrder));
      }
    }
    return customerOrders;
  }
}
