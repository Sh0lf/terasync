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
  customerOrderId: number | undefined;
  creationTime: string | undefined;
  minTemp: number | undefined;
  maxTemp: number | undefined;
  deliveryTime: string | undefined;
  statusId: number;
  packagingId: number;
  customerId: number;
  businessId: number;
  addressId: number;
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

  rated: boolean = true;

  constructor(statusId: number, packagingId: number, customerId: number, businessId: number,
              deliveryServiceId: number, deliveryPersonId: number, addressId: number, minTemp?: number,
              maxTemp?: number, deliveryTime?: string, customerOrderId?: number, creationTime?: string) {
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
    this.addressId = addressId;
  }

  static fromJson(jsonCustomerOrder: CustomerOrder) {
    let customerOrder: CustomerOrder = new CustomerOrder(jsonCustomerOrder.statusId,
      jsonCustomerOrder.packagingId, jsonCustomerOrder.customerId, jsonCustomerOrder.businessId,
      jsonCustomerOrder.deliveryServiceId, jsonCustomerOrder.deliveryPersonId, jsonCustomerOrder.addressId,
      jsonCustomerOrder.minTemp, jsonCustomerOrder.maxTemp, jsonCustomerOrder.deliveryTime,
      jsonCustomerOrder.customerOrderId, jsonCustomerOrder.creationTime)

    customerOrder.customerOrderLists = CustomerOrderList.initializeCustomerOrderLists(jsonCustomerOrder);
    customerOrder.messageLists = MessageList.initializeMessageLists(jsonCustomerOrder);
    customerOrder.status = Status.fromJson(jsonCustomerOrder.status!)
    customerOrder.packaging = Packaging.fromJson(jsonCustomerOrder.packaging!);
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

  setRated(rated: boolean) {
    this.rated = rated;
  }

  hasDeliveryTime() {
    return this.deliveryTime != undefined;
  }
}
