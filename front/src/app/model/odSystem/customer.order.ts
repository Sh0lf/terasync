export interface CustomerOrder {
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
}
