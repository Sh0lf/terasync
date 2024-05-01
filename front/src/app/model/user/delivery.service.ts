import {User} from "./user";
import {DeliveryServiceList} from "../odSystem/delivery.service.list";
import {DeliveryPerson} from "./delivery.person";
import {CustomerOrder} from "../odSystem/customer.order";

export class DeliveryService extends User {
  override deliveryServiceId: number | undefined
  override approved: boolean | undefined;

  override deliveryServiceLists: DeliveryServiceList[] = [];
  override customerOrders: CustomerOrder[] = [];
  override deliveryPeople: DeliveryPerson[] = [];

  constructor(name: string, email: string, username: string,
              password: string, deliveryServiceId?: number | undefined,
              registrationDate?: string | undefined,  token?: string | undefined,
              emailVerified?: boolean | undefined, approved?: boolean | undefined,
              pfpImgPath?: string | undefined) {
    super(email, username, password, deliveryServiceId, registrationDate, token, emailVerified, pfpImgPath, name);
    this.deliveryServiceId = deliveryServiceId;
    this.approved = approved;
  }
}
