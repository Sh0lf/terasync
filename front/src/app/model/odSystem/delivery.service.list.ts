export class DeliveryServiceList {
  deliveryServiceListId: number | undefined;
  deliveryServiceId: number;
  businessId: number;


  constructor(deliveryServiceId: number, businessId: number, deliveryServiceListId?: number) {
    this.deliveryServiceListId = deliveryServiceListId;
    this.deliveryServiceId = deliveryServiceId;
    this.businessId = businessId;
  }

  public static fromJson(json: DeliveryServiceList): DeliveryServiceList {
    return new DeliveryServiceList(json.deliveryServiceId, json.businessId, json.deliveryServiceListId);
  }

  static initializeDeliveryServiceLists(jsonUser: {deliveryServiceLists: DeliveryServiceList[]}): DeliveryServiceList[] {
    let deliveryServiceLists: DeliveryServiceList[] = [];
    if (jsonUser.deliveryServiceLists) {
      for (let deliveryServiceList of jsonUser.deliveryServiceLists) {
        deliveryServiceLists.push(DeliveryServiceList.fromJson(deliveryServiceList));
      }
    }
    return deliveryServiceLists;
  }
}
