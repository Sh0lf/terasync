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


  constructor(customerOrderId: number, creationTime: string, minTemp: number, maxTemp: number, deliveryTime: string, statusId: string, packagingId: number, customerId: number, businessId: number, deliveryServiceId: number, deliveryPersonId: number) {
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

  static fromJson(customerOrder: CustomerOrder) {
    return new CustomerOrder(customerOrder.customerOrderId, customerOrder.creationTime,
      customerOrder.minTemp, customerOrder.maxTemp, customerOrder.deliveryTime,
      customerOrder.statusId, customerOrder.packagingId, customerOrder.customerId,
      customerOrder.businessId, customerOrder.deliveryServiceId, customerOrder.deliveryPersonId);
  }
}
